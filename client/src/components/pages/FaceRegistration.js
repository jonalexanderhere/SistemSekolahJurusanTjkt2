import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as faceapi from 'face-api.js';
import { Camera, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import './FaceRegistration.css';

function FaceRegistration({ user }) {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success, error, info
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    loadModels();
    checkRegistrationStatus();
    
    return () => {
      stopCamera();
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
      setMessage('Model wajah berhasil dimuat');
      setMessageType('success');
    } catch (error) {
      console.error('Error loading models:', error);
      setMessage('Gagal memuat model. Silakan refresh halaman.');
      setMessageType('error');
    }
  };

  const checkRegistrationStatus = async () => {
    try {
      // Vercel serverless
      const response = await axios.get(`/api/face/status`, { params: { studentId: user.id } });
      setIsRegistered(!!response.data.faceRegistered);
    } catch (error) {
      console.error('Error checking registration status:', error);
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
      setMessage('Kamera aktif. Posisikan wajah Anda di depan kamera.');
      setMessageType('info');
    } catch (error) {
      console.error('Error starting camera:', error);
      setMessage('Gagal mengakses kamera. Pastikan Anda memberikan izin akses kamera.');
      setMessageType('error');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setCapturing(false);
  };

  const captureAndRegister = async () => {
    if (!videoRef.current || !modelsLoaded) return;

    try {
      setMessage('Mendeteksi wajah...');
      setMessageType('info');

      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (detections.length === 0) {
        setMessage('Wajah tidak terdeteksi. Pastikan wajah Anda terlihat jelas.');
        setMessageType('error');
        return;
      }

      if (detections.length > 1) {
        setMessage('Terlalu banyak wajah terdeteksi. Pastikan hanya wajah Anda yang terlihat.');
        setMessageType('error');
        return;
      }

      // Draw detection on canvas
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
        faceapi.matchDimensions(canvas, displaySize);
        
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      }

      // Save face descriptor
      const descriptor = detections[0].descriptor;
      
      await axios.post('/api/face/register', {
        studentId: user.id,
        nisn: user.nisn,
        nama: user.nama,
        descriptors: Array.from(descriptor)
      });

      setMessage('Wajah berhasil didaftarkan! Sekarang Anda dapat menggunakan absensi face recognition.');
      setMessageType('success');
      setIsRegistered(true);
      stopCamera();
    } catch (error) {
      console.error('Error registering face:', error);
      setMessage('Gagal mendaftarkan wajah. Silakan coba lagi.');
      setMessageType('error');
    }
  };

  const deleteRegistration = async () => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus registrasi wajah?')) return;

    try {
      await axios.delete(`/api/face/delete/${user.id}`);
      setIsRegistered(false);
      setMessage('Registrasi wajah berhasil dihapus.');
      setMessageType('success');
    } catch (error) {
      console.error('Error deleting registration:', error);
      setMessage('Gagal menghapus registrasi wajah.');
      setMessageType('error');
    }
  };

  return (
    <div className="face-registration-page">
      <h1>Registrasi Wajah</h1>
      <p className="subtitle">Daftarkan wajah Anda untuk menggunakan fitur absensi face recognition</p>

      {message && (
        <div className={`message-box message-${messageType}`}>
          {messageType === 'success' && <CheckCircle size={20} />}
          {messageType === 'error' && <XCircle size={20} />}
          {messageType === 'info' && <AlertCircle size={20} />}
          <span>{message}</span>
        </div>
      )}

      <div className="registration-container">
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
                <p>Kamera tidak aktif</p>
              </div>
            )}
          </div>

          <div className="camera-controls">
            {!capturing ? (
              <button 
                className="btn btn-primary" 
                onClick={startCamera}
                disabled={!modelsLoaded || isRegistered}
              >
                <Camera size={20} />
                Aktifkan Kamera
              </button>
            ) : (
              <>
                <button className="btn btn-success" onClick={captureAndRegister}>
                  <CheckCircle size={20} />
                  Daftarkan Wajah
                </button>
                <button className="btn btn-secondary" onClick={stopCamera}>
                  Batal
                </button>
              </>
            )}
          </div>
        </div>

        <div className="info-section">
          <div className="card">
            <h2>Status Registrasi</h2>
            <div className="status-info">
              {isRegistered ? (
                <>
                  <CheckCircle size={48} color="#10b981" />
                  <p className="status-text success">Wajah Sudah Terdaftar</p>
                  <button className="btn btn-danger" onClick={deleteRegistration}>
                    Hapus Registrasi
                  </button>
                </>
              ) : (
                <>
                  <XCircle size={48} color="#ef4444" />
                  <p className="status-text error">Wajah Belum Terdaftar</p>
                </>
              )}
            </div>
          </div>

          <div className="card">
            <h2>Panduan Registrasi</h2>
            <ol className="guide-list">
              <li>Pastikan pencahayaan cukup terang</li>
              <li>Posisikan wajah tepat di depan kamera</li>
              <li>Pastikan hanya wajah Anda yang terlihat</li>
              <li>Klik tombol "Aktifkan Kamera"</li>
              <li>Tunggu hingga wajah terdeteksi (kotak hijau muncul)</li>
              <li>Klik "Daftarkan Wajah" untuk menyimpan</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaceRegistration;

