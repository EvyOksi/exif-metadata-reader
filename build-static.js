#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Building EXIF Metadata Reader for static deployment...');

try {
  // Run the vite build
  execSync('npx vite build', { stdio: 'inherit' });
  
  // Check if dist/public exists, if not copy from dist
  const distPublic = './dist/public';
  const dist = './dist';
  
  if (!fs.existsSync(distPublic) && fs.existsSync(dist)) {
    // If dist/public doesn't exist but dist does, we need to move files
    const files = fs.readdirSync(dist);
    const hasHtml = files.some(file => file.endsWith('.html'));
    
    if (hasHtml) {
      // Create public directory and move files
      fs.mkdirSync(distPublic, { recursive: true });
      
      files.forEach(file => {
        const srcPath = path.join(dist, file);
        const destPath = path.join(distPublic, file);
        
        if (fs.lstatSync(srcPath).isDirectory()) {
          fs.cpSync(srcPath, destPath, { recursive: true });
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      });
      
      console.log('✓ Build files organized for GitHub Pages deployment');
    }
  }
  
  console.log('✓ Static build completed successfully');
  console.log('Deploy to GitHub Pages by pushing to main branch');
  
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}