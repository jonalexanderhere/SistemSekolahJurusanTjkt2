import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentsPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/auth/students');
        setStudents(res.data);
      } catch (e) {}
    })();
  }, []);

  return (
    <div className="card">
      <h2>Data Siswa - XII TJKT 2</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>NISN</th>
              <th>Kelas</th>
            </tr>
          </thead>
          <tbody>
            {students
              .filter(s => s.kelas === 'XII TJKT 2')
              .map((s) => (
                <tr key={s.id}>
                  <td>{s.nama}</td>
                  <td>{s.nisn}</td>
                  <td>{s.kelas}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentsPage;


