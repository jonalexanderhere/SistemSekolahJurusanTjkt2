#!/usr/bin/env node

/**
 * Vercel Build Script for TJKT Client
 * Fixes TypeScript conflicts and ensures successful build
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel build process...');

try {
  // Set npm configuration
  console.log('📦 Configuring npm...');
  execSync('npm config set legacy-peer-deps true', { stdio: 'inherit' });
  execSync('npm config set force true', { stdio: 'inherit' });

  // Clean install with legacy peer deps
  console.log('📥 Installing dependencies...');
  execSync('npm install --legacy-peer-deps --force', { stdio: 'inherit' });

  // Download face-api models
  console.log('🤖 Downloading face-api models...');
  try {
    execSync('npm run fetch-models', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️ Face models download failed, continuing...');
  }

  // Build the project
  console.log('🔨 Building project...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
