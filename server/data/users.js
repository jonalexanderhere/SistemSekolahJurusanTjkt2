const bcrypt = require('bcryptjs');

// Hash password helper
const hashPassword = (password) => bcrypt.hashSync(password, 10);

const users = {
  admins: [
    {
      id: 'admin001',
      username: 'admin1',
      password: hashPassword('Admin#SMKN1Liwa2024!'),
      nama: 'Administrator 1 - SMK Negeri 1 Liwa',
      role: 'admin',
      email: 'admin1@smkn1liwa.sch.id'
    },
    {
      id: 'admin002',
      username: 'admin2',
      password: hashPassword('Liwa@TJKT#2024Secure!'),
      nama: 'Administrator 2 - SMK Negeri 1 Liwa',
      role: 'admin',
      email: 'admin2@smkn1liwa.sch.id'
    }
  ],
  
  teachers: [
    {
      id: 'guru001',
      username: 'didik',
      password: hashPassword('Didik@MPKK2024!'),
      nama: 'DIDIK KURNIAWAN, S.Kom, M.TI',
      role: 'guru',
      email: 'didik.kurniawan@smkn1liwa.sch.id',
      nip: '198103102010011012',
      mataPelajaran: ['MPKK']
    },
    {
      id: 'guru002',
      username: 'ade',
      password: hashPassword('Ade@TJKT2024!'),
      nama: 'ADE FIRMANSYAH, S.Kom',
      role: 'guru',
      email: 'ade.firmansyah@smkn1liwa.sch.id',
      nip: '3855773674130022',
      mataPelajaran: ['MPKK']
    }
  ],
  
  students: [
    { nisn: "0089990908", id: "6643", username: "0089990908", password: hashPassword("6643"), nama: "ALLDOO SAPUTRA", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0071887022", id: "6644", username: "0071887022", password: hashPassword("6644"), nama: "ALYA ANGGITA MAHERA", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0071317242", id: "6645", username: "0071317242", password: hashPassword("6645"), nama: "AMELIA", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0083627332", id: "6646", username: "0083627332", password: hashPassword("6646"), nama: "AMELIA SEPTIA SARI", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0081278251", id: "6647", username: "0081278251", password: hashPassword("6647"), nama: "AULIA KENANGA SAFITRI", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "3102623580", id: "6648", username: "3102623580", password: hashPassword("6648"), nama: "AYUNDA NAFISHA", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0088754753", id: "6649", username: "0088754753", password: hashPassword("6649"), nama: "BERLIAN ANUGRAH PRATAMA", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0076775460", id: "6650", username: "0076775460", password: hashPassword("6650"), nama: "DESTI RAHAYU", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0077986875", id: "6651", username: "0077986875", password: hashPassword("6651"), nama: "DESTIA", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0069944236", id: "6652", username: "0069944236", password: hashPassword("6652"), nama: "ERIC ERIANTO", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0084352502", id: "6653", username: "0084352502", password: hashPassword("6653"), nama: "FAIZAH AZ ZAHRA", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0082539133", id: "6654", username: "0082539133", password: hashPassword("6654"), nama: "FITRI ULANDARI", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0074043979", id: "6655", username: "0074043979", password: hashPassword("6655"), nama: "GHEA LITA ANASTASYA", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0081353027", id: "6656", username: "0081353027", password: hashPassword("6656"), nama: "JHOVANI WIJAYA", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0082019386", id: "6657", username: "0082019386", password: hashPassword("6657"), nama: "KEISYA AGUSTIN RASFA AULIA", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0074731920", id: "6659", username: "0074731920", password: hashPassword("6659"), nama: "MAHARANI", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0076724319", id: "6660", username: "0076724319", password: hashPassword("6660"), nama: "NAURA GHIFARI AZHAR", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0083063479", id: "6662", username: "0083063479", password: hashPassword("6662"), nama: "PATRA ADITTIA", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0085480329", id: "6663", username: "0085480329", password: hashPassword("6663"), nama: "PUTRI SAPARA", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0079319957", id: "6664", username: "0079319957", password: hashPassword("6664"), nama: "RAFI SEPTA WIRA TAMA", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0082901449", id: "6665", username: "0082901449", password: hashPassword("6665"), nama: "RAKA RAMADHANI PRATAMA", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0081628824", id: "6666", username: "0081628824", password: hashPassword("6666"), nama: "REGITA MAHARANI", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0081133109", id: "6667", username: "0081133109", password: hashPassword("6667"), nama: "REGITHA ANINDYA AZZAHRA", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0076040547", id: "6668", username: "0076040547", password: hashPassword("6668"), nama: "RENDI ARISNANDO", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0078327818", id: "6669", username: "0078327818", password: hashPassword("6669"), nama: "RIDHO ZAENAL MUSTAQIM", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0076113354", id: "6670", username: "0076113354", password: hashPassword("6670"), nama: "RISTY WIDIASIH", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "0084399894", id: "6671", username: "0084399894", password: hashPassword("6671"), nama: "SIFA RISTIANA", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "AMELDIANA", id: "6672", username: "AMELDIANA", password: hashPassword("6672"), nama: "AMELIA DIANA", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false },
    { nisn: "DESTAMEL", id: "6673", username: "DESTAMEL", password: hashPassword("6673"), nama: "DESTA AMELIA", role: "siswa", kelas: "XII TJKT 2", hadir: false, faceRegistered: false }
  ]
};

module.exports = users;

