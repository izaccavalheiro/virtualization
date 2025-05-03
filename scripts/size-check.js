import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { gzipSizeSync } from 'gzip-size';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist');

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' bytes';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KiB';
  else return (bytes / 1048576).toFixed(2) + ' MiB';
}

function checkFileSize() {
  console.log('Checking build output file sizes...\n');
  
  const files = fs.readdirSync(distDir);
  const results = [];
  
  files.forEach(file => {
    const filePath = path.join(distDir, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory() || file.endsWith('.d.ts')) return;
    
    const content = fs.readFileSync(filePath);
    
    results.push({
      file,
      size: stats.size,
      gzipSize: gzipSizeSync(content),
    });
  });
  
  results.sort((a, b) => b.size - a.size);
  
  console.log('File Sizes:');
  console.log('-----------');
  results.forEach(item => {
    console.log(
      `${item.file.padEnd(30)} ${formatSize(item.size).padStart(10)} | gzipped: ${formatSize(item.gzipSize).padStart(10)}`
    );
  });
}

checkFileSize();
