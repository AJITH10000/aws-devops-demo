const fs = require('fs');
if (!fs.existsSync('index.html')) {
  console.error('index.html not found');
  process.exit(1);
}
console.log('Test passed: index.html exists');