const https = require('https');
const fs = require('fs');
const path = require('path');

const base = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/';
const files = [
  // Tiny Face Detector (fast)
  { url: base + 'tiny_face_detector_model-weights_manifest.json', out: 'tiny_face_detector_model-weights_manifest.json' },
  { url: base + 'tiny_face_detector_model-shard1', out: 'tiny_face_detector_model-shard1' },
  // Face Landmark 68
  { url: base + 'face_landmark_68_model-weights_manifest.json', out: 'face_landmark_68_model-weights_manifest.json' },
  { url: base + 'face_landmark_68_model-shard1', out: 'face_landmark_68_model-shard1' },
  // Face Recognition
  { url: base + 'face_recognition_model-weights_manifest.json', out: 'face_recognition_model-weights_manifest.json' },
  { url: base + 'face_recognition_model-shard1', out: 'face_recognition_model-shard1' },
  { url: base + 'face_recognition_model-shard2', out: 'face_recognition_model-shard2' }
  // Only required models; skip expressions to reduce size
];

const modelsDir = path.join(__dirname, '..', 'public', 'models');

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          file.close();
          fs.unlink(dest, () => {});
          return reject(new Error(`Failed to download ${url} - Status ${response.statusCode}`));
        }
        response.pipe(file);
        file.on('finish', () => file.close(resolve));
      })
      .on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

(async () => {
  try {
    if (!fs.existsSync(modelsDir)) {
      fs.mkdirSync(modelsDir, { recursive: true });
    }

    for (const f of files) {
      const outPath = path.join(modelsDir, f.out);
      if (fs.existsSync(outPath)) continue;
      console.log('Downloading model:', f.out);
      await downloadFile(f.url, outPath);
    }
    console.log('All face-api.js models downloaded.');
  } catch (e) {
    console.warn('Failed to download some face-api.js models:', e.message);
  }
})();


