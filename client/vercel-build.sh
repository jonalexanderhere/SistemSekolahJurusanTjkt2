#!/bin/bash

# Vercel Build Script for TJKT Client
# Fixes TypeScript conflicts and ensures successful build

echo "🚀 Starting Vercel build process..."

# Set npm configuration
echo "📦 Configuring npm..."
npm config set legacy-peer-deps true
npm config set force true

# Clean install with legacy peer deps
echo "📥 Installing dependencies..."
npm install --legacy-peer-deps --force

# Download face-api models
echo "🤖 Downloading face-api models..."
npm run fetch-models

# Build the project
echo "🔨 Building project..."
npm run build

echo "✅ Build completed successfully!"
