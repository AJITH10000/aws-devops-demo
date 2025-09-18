const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, 'index.html');
const destDir = path.join(__dirname, 'build');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir);
fs.copyFileSync(src, path.join(destDir,'index.html'));
console.log('Build completed: build/index.html created');