import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { gzipSizeSync } from 'gzip-size';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist');

// Gzipped size budgets per bundle. The build fails when one is exceeded, which
// catches accidental bundling of dependencies (e.g. react/jsx-runtime).
const budgets = {
  'virtualization.js': 5 * 1024,
  'virtualization.umd.cjs': 5 * 1024,
};

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
    
    if (stats.isDirectory() || file.endsWith('.d.ts') || file.endsWith('.d.cts')) return;
    
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
  const failures = [];
  results.forEach(item => {
    const budget = budgets[item.file];
    const budgetLabel = budget ? ` / budget ${formatSize(budget)}` : '';
    console.log(
      `${item.file.padEnd(30)} ${formatSize(item.size).padStart(10)} | gzipped: ${formatSize(item.gzipSize).padStart(10)}${budgetLabel}`
    );
    if (budget && item.gzipSize > budget) failures.push(item.file);
  });

  if (failures.length > 0) {
    console.error(`\nSize budget exceeded: ${failures.join(', ')}`);
    process.exitCode = 1;
  }
}

checkFileSize();
