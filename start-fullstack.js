#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting SynergySphere Full-Stack Application...\n');

// Check if .env file exists in backend
import fs from 'fs';
const backendEnvPath = path.join(__dirname, 'backend', '.env');
if (!fs.existsSync(backendEnvPath)) {
  console.log('⚠️  Backend .env file not found. Creating from template...');
  const envExample = fs.readFileSync(path.join(__dirname, 'backend', 'env.example'), 'utf8');
  fs.writeFileSync(backendEnvPath, envExample);
  console.log('✅ Backend .env file created. Please update with your configuration.\n');
}

// Check if .env.local file exists in frontend
const frontendEnvPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(frontendEnvPath)) {
  console.log('⚠️  Frontend .env.local file not found. Creating...');
  const frontendEnv = `# API Configuration
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000`;
  fs.writeFileSync(frontendEnvPath, frontendEnv);
  console.log('✅ Frontend .env.local file created.\n');
}

// Start backend server (using mock mode for easy setup)
console.log('🔧 Starting backend server in mock mode...');
const backend = spawn('node', ['server-dev.js'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'pipe',
  shell: true
});

backend.stdout.on('data', (data) => {
  console.log(`[Backend] ${data.toString().trim()}`);
});

backend.stderr.on('data', (data) => {
  console.error(`[Backend Error] ${data.toString().trim()}`);
});

// Wait a bit for backend to start, then start frontend
setTimeout(() => {
  console.log('\n🎨 Starting frontend development server...');
  const frontend = spawn('npm', ['run', 'dev', '--', '--port', '8080'], {
    cwd: __dirname,
    stdio: 'pipe',
    shell: true
  });

  frontend.stdout.on('data', (data) => {
    console.log(`[Frontend] ${data.toString().trim()}`);
  });

  frontend.stderr.on('data', (data) => {
    console.error(`[Frontend Error] ${data.toString().trim()}`);
  });

  // Handle graceful shutdown
  const shutdown = () => {
    console.log('\n🛑 Shutting down servers...');
    backend.kill('SIGINT');
    frontend.kill('SIGINT');
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

}, 3000);

// Handle backend errors
backend.on('error', (err) => {
  console.error('❌ Failed to start backend:', err);
  process.exit(1);
});

backend.on('close', (code) => {
  console.log(`\n🛑 Backend process exited with code ${code}`);
  if (code !== 0) {
    process.exit(code);
  }
});
