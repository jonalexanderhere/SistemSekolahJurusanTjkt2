const bcrypt = require('bcryptjs');

/**
 * SCRIPT: Generate Password Hashes untuk Supabase
 * 
 * Script ini men-generate bcrypt hash untuk semua password
 * yang akan di-insert ke Supabase database.
 * 
 * Run: node scripts/generate-password-hashes.js
 */

console.log('🔐 Generating Password Hashes...\n');
console.log('===============================================');

// Admin Passwords
console.log('\n📌 ADMIN PASSWORDS:');
console.log('-------------------');
const admin1Hash = bcrypt.hashSync('Admin#SMKN1Liwa2024!', 10);
const admin2Hash = bcrypt.hashSync('Liwa@TJKT#2024Secure!', 10);
console.log(`admin1 (Admin#SMKN1Liwa2024!):`);
console.log(`'${admin1Hash}'`);
console.log(`\nadmin2 (Liwa@TJKT#2024Secure!):`);
console.log(`'${admin2Hash}'`);

// Guru Passwords
console.log('\n\n📌 GURU PASSWORDS:');
console.log('-------------------');
const guruHash = bcrypt.hashSync('guru123', 10);
console.log(`guru1 & guru2 (guru123):`);
console.log(`'${guruHash}'`);

// Student Passwords (hash untuk setiap ID siswa)
console.log('\n\n📌 STUDENT PASSWORDS:');
console.log('-------------------');

const studentIDs = [
  '6643', '6644', '6645', '6646', '6647', '6648', '6649', '6650',
  '6651', '6652', '6653', '6654', '6655', '6656', '6657', '6659',
  '6660', '6662', '6663', '6664', '6665', '6666', '6667', '6668',
  '6669', '6670', '6671', '6672', '6673'
];

const studentHashes = {};
studentIDs.forEach(id => {
  studentHashes[id] = bcrypt.hashSync(id, 10);
});

console.log('Sample (first 3):');
console.log(`6643: '${studentHashes['6643']}'`);
console.log(`6644: '${studentHashes['6644']}'`);
console.log(`6645: '${studentHashes['6645']}'`);
console.log('\n... (dan seterusnya untuk semua siswa)');

// Generate SQL INSERT statements
console.log('\n\n===============================================');
console.log('📝 COPY SQL STATEMENTS BELOW:');
console.log('===============================================\n');

console.log('-- UPDATE ADMIN PASSWORDS');
console.log(`UPDATE users SET password = '${admin1Hash}' WHERE id = 'admin001';`);
console.log(`UPDATE users SET password = '${admin2Hash}' WHERE id = 'admin002';`);

console.log('\n-- UPDATE GURU PASSWORDS');
console.log(`UPDATE users SET password = '${guruHash}' WHERE id = 'guru001';`);
console.log(`UPDATE users SET password = '${guruHash}' WHERE id = 'guru002';`);

console.log('\n-- UPDATE STUDENT PASSWORDS');
studentIDs.forEach(id => {
  console.log(`UPDATE users SET password = '${studentHashes[id]}' WHERE id = '${id}';`);
});

console.log('\n\n===============================================');
console.log('✅ Done! Copy the SQL above and run in Supabase SQL Editor');
console.log('===============================================\n');

// Also save to file
const fs = require('fs');
const outputSQL = `
-- ============================================
-- AUTO-GENERATED PASSWORD HASHES
-- Generated: ${new Date().toISOString()}
-- ============================================

-- ADMIN PASSWORDS
UPDATE users SET password = '${admin1Hash}' WHERE id = 'admin001';
UPDATE users SET password = '${admin2Hash}' WHERE id = 'admin002';

-- GURU PASSWORDS
UPDATE users SET password = '${guruHash}' WHERE id = 'guru001';
UPDATE users SET password = '${guruHash}' WHERE id = 'guru002';

-- STUDENT PASSWORDS
${studentIDs.map(id => `UPDATE users SET password = '${studentHashes[id]}' WHERE id = '${id}';`).join('\n')}
`;

fs.writeFileSync('supabase_update_passwords.sql', outputSQL);
console.log('💾 SQL file saved to: supabase_update_passwords.sql\n');

