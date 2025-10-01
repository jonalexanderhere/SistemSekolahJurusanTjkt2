import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as faceapi from 'face-api.js';
import io from 'socket.io-client';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { Camera, ClipboardCheck, Users, Calendar } from 'lucide-react';
import './AttendancePage.css';

const socket = io('http://localhost:5000');

function AttendancePage({ user }) {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [message, setMessage] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [summary, setSummary] = useState({ total: 0, hadir: 0, tidak_hadir: 0 });
  const [labeledDescriptors, setLabeledDescriptors] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const detectionInterval = useRef(null);

  useEffect(() => {
    loadModels();
    loadAttendanceData();
    loadFaceDescriptors();

    // Listen for realtime attendance updates
    socket.on('attendanceUpdate', (newAttendance) => {
      setAttendanceRecords(prev => [newAttendance, ...prev]);
      loadAttendanceData(); // Refresh summary
      setMessage(`${newAttendance.nama} telah absen!`);
      showToast('Absensi berhasil dicatat');
    });

    // Supabase realtime only if configured
    let channel = null;
    if (isSupabaseConfigured && supabase) {
      channel = supabase
        .channel('attendance-changes')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'attendance' }, (payload) => {
          const r = payload.new;
          setAttendanceRecords(prev => [{
            id: `att_${r.id || Date.now()}`,
            studentId: r.student_id,
            nisn: r.nisn,
            nama: r.nama,
            kelas: r.kelas,
            type: r.type,
            method: r.method,
            timestamp: r.timestamp_iso,
            date: r.date_id,
            time: r.time_id,
            status: r.status
          }, ...prev]);
          showToast('Absensi berhasil dicatat');
        })
        .subscribe();
    }

    return () => {
      stopCamera();
      socket.off('attendanceUpdate');
      if (channel && supabase) {
        supabase.removeChannel(channel);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadModels = async () => {
    try {
      const MODEL_URL = '/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
      ]);
      setModelsLoaded(true);
    } catch (error) {
      console.error('Error loading models:', error);
    }
  };

  const loadAttendanceData = async () => {
    try {
      const today = new Date().toLocaleDateString('id-ID');
      
      if (user.role === 'siswa') {
        const response = await axios.get(`/api/attendance/history/${user.id}`);
        setAttendanceRecords(response.data);
      } else {
        const [recordsRes, summaryRes] = await Promise.all([
          axios.get('/api/attendance/records', { params: { date: today } }),
          axios.get('/api/attendance/summary', { params: { date: today } })
        ]);
        
        setAttendanceRecords(recordsRes.data);
        setSummary(summaryRes.data);
      }
    } catch (error) {
      console.error('Error loading attendance:', error);
    }
  };

  const loadFaceDescriptors = async () => {
    try {
      const response = await axios.get('/api/face/descriptors');
      const descriptors = response.data.map(item => 
        new faceapi.LabeledFaceDescriptors(
          item.nama,
          [new Float32Array(item.descriptors)]
        )
      );
      setLabeledDescriptors(descriptors);
    } catch (error) {
      console.error('Error loading face descriptors:', error);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      
      setCapturing(true);
      setMessage('Kamera aktif. Posisikan wajah untuk absensi...');
      
      // Start face detection
      startFaceDetection();
    } catch (error) {
      console.error('Error starting camera:', error);
      setMessage('Gagal mengakses kamera.');
    }
  };

  const stopCamera = () => {
    if (detectionInterval.current) {
      clearInterval(detectionInterval.current);
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setCapturing(false);
  };

  const startFaceDetection = () => {
    detectionInterval.current = setInterval(async () => {
      if (videoRef.current && canvasRef.current && modelsLoaded) {
        const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();

        const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
        faceapi.matchDimensions(canvasRef.current, displaySize);

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (labeledDescriptors.length > 0 && detections.length > 0) {
          const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
          
          resizedDetections.forEach(detection => {
            const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
            
            if (bestMatch.label !== 'unknown') {
              // Draw box and label
              const box = detection.detection.box;
              const drawBox = new faceapi.draw.DrawBox(box, { 
                label: bestMatch.label,
                boxColor: '#10b981'
              });
              drawBox.draw(canvas);
              
              // Auto attendance (only for students)
              if (user.role === 'siswa' && bestMatch.label === user.nama) {
                handleFaceAttendance();
              }
            } else {
              faceapi.draw.drawDetections(canvas, resizedDetections);
            }
          });
        } else {
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        }
      }
    }, 500);
  };

  const handleFaceAttendance = async () => {
    // Prevent multiple submissions
    if (detectionInterval.current) {
      clearInterval(detectionInterval.current);
    }

    try {
      // Check attendance time first
      const timeCheck = await axios.get('/api/settings/check/attendance-time');
      const { canCheckin, currentPeriod, message: timeMessage } = timeCheck.data;

      if (!canCheckin) {
        setMessage(`❌ ${timeMessage}`);
        showToast(timeMessage);
        stopCamera();
        return;
      }

      // Record attendance with correct period type
      try {
        await axios.post('/api/attendance/record', {
          studentId: user.id,
          nisn: user.nisn,
          nama: user.nama,
          kelas: user.kelas,
          type: currentPeriod, // 'masuk' or 'pulang' based on current time
          method: 'face'
        });
      } catch (e) {
        // fallback to legacy backend
        await axios.post('/api/attendance/record', {
          studentId: user.id,
          type: currentPeriod,
          method: 'face'
        });
      }

      setMessage(`✅ Absensi ${currentPeriod} berhasil dicatat!`);
      showToast(`Absensi ${currentPeriod} berhasil ✅`);
      stopCamera();
      loadAttendanceData();
    } catch (error) {
      console.error('Error recording attendance:', error);
      setMessage('Gagal mencatat absensi.');
      startFaceDetection(); // Resume detection
    }
  };


  const showToast = (text) => {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'granted') {
      new Notification('TJKT MPKK', { body: text });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('TJKT MPKK', { body: text });
        }
      });
    }
  };

  return (
    <div className="attendance-page">
      <h1>Absensi</h1>
      <p className="subtitle">
        {user.role === 'siswa' 
          ? 'Lakukan absensi menggunakan face recognition' 
          : 'Kelola absensi siswa'}
      </p>

      {message && (
        <div className="message-box message-info">
          {message}
        </div>
      )}

      {user.role !== 'siswa' && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#dbeafe' }}>
              <Users size={24} color="#1e40af" />
            </div>
            <div className="stat-info">
              <h3>Total Siswa</h3>
              <p className="stat-value">{summary.total}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#d1fae5' }}>
              <ClipboardCheck size={24} color="#065f46" />
            </div>
            <div className="stat-info">
              <h3>Hadir</h3>
              <p className="stat-value">{summary.hadir}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fee2e2' }}>
              <Calendar size={24} color="#991b1b" />
            </div>
            <div className="stat-info">
              <h3>Tidak Hadir</h3>
              <p className="stat-value">{summary.tidak_hadir}</p>
            </div>
          </div>
        </div>
      )}

      {user.role === 'siswa' && (
        <div className="camera-section card">
          <div className="video-container">
            <video
              ref={videoRef}
              autoPlay
              muted
              width="640"
              height="480"
              style={{ display: capturing ? 'block' : 'none' }}
            />
            <canvas
              ref={canvasRef}
              width="640"
              height="480"
              style={{ position: 'absolute', display: capturing ? 'block' : 'none' }}
            />
            {!capturing && (
              <div className="camera-placeholder">
                <Camera size={64} />
                <p>Klik tombol untuk memulai absensi</p>
              </div>
            )}
          </div>

          <div className="camera-controls">
            {!capturing ? (
              <button className="btn btn-primary" onClick={startCamera} disabled={!modelsLoaded}>
                <Camera size={20} />
                Mulai Absensi
              </button>
            ) : (
              <button className="btn btn-danger" onClick={stopCamera}>
                Batal
              </button>
            )}
          </div>
        </div>
      )}

      <div className="card">
        <h2>Riwayat Absensi</h2>
        {attendanceRecords.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  {user.role !== 'siswa' && <th>Nama</th>}
                  {user.role !== 'siswa' && <th>Kelas</th>}
                  <th>Tanggal</th>
                  <th>Waktu</th>
                  <th>Metode</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((record) => (
                  <tr key={record.id}>
                    {user.role !== 'siswa' && <td>{record.nama}</td>}
                    {user.role !== 'siswa' && <td>{record.kelas}</td>}
                    <td>{record.date}</td>
                    <td>{record.time}</td>
                    <td>
                      <span className={`badge ${record.method === 'face' ? 'badge-info' : 'badge-warning'}`}>
                        {record.method === 'face' ? 'Face Recognition' : 'Manual'}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-success">Hadir</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty-state">Belum ada data absensi</p>
        )}
      </div>
    </div>
  );
}

export default AttendancePage;

