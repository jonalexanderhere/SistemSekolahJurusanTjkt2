const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../data/users');

const JWT_SECRET = process.env.JWT_SECRET || 'tjkt_mpkk_secret_key_2024';

// Login endpoint
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Search for user in all roles
  let user = null;
  let userType = null;

  // Check admins
  user = users.admins.find(u => u.username === username);
  if (user) userType = 'admin';

  // Check teachers
  if (!user) {
    user = users.teachers.find(u => u.username === username);
    if (user) userType = 'teacher';
  }

  // Check students
  if (!user) {
    user = users.students.find(u => u.username === username);
    if (user) userType = 'student';
  }

  if (!user) {
    return res.status(401).json({ message: 'Username tidak ditemukan' });
  }

  // Verify password
  const isValidPassword = bcrypt.compareSync(password, user.password);
  
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Password salah' });
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;

  res.json({
    message: 'Login berhasil',
    token,
    user: userWithoutPassword
  });
});

// Get current user
router.get('/me', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Find user
    let user = users.admins.find(u => u.id === decoded.id) ||
               users.teachers.find(u => u.id === decoded.id) ||
               users.students.find(u => u.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(401).json({ message: 'Token tidak valid' });
  }
});

// Get all students (for admin/teacher)
router.get('/students', (req, res) => {
  const studentsWithoutPasswords = users.students.map(({ password, ...student }) => student);
  res.json(studentsWithoutPasswords);
});

// Change password
router.post('/change-password', (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  if (!userId || !currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Data tidak lengkap' });
  }

  // Find user
  let user = null;
  let userArray = null;

  user = users.admins.find(u => u.id === userId);
  if (user) userArray = users.admins;

  if (!user) {
    user = users.teachers.find(u => u.id === userId);
    if (user) userArray = users.teachers;
  }

  if (!user) {
    user = users.students.find(u => u.id === userId);
    if (user) userArray = users.students;
  }

  if (!user) {
    return res.status(404).json({ message: 'User tidak ditemukan' });
  }

  // Verify current password
  const isValidPassword = bcrypt.compareSync(currentPassword, user.password);
  
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Password saat ini salah' });
  }

  // Validate new password strength
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    return res.status(400).json({ 
      message: 'Password baru harus minimal 8 karakter dan mengandung huruf besar, huruf kecil, angka, dan karakter khusus' 
    });
  }

  // Update password
  user.password = bcrypt.hashSync(newPassword, 10);

  res.json({ 
    message: 'Password berhasil diubah',
    success: true 
  });
});

module.exports = router;

