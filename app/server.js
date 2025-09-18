const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 8080;
http.createServer((req,res)=>{
  let p = req.url === '/' ? 'build/index.html' : ('build' + req.url);
  if (!fs.existsSync(p)) { res.writeHead(404); res.end('Not Found'); return; }
  res.writeHead(200, {'Content-Type':'text/html'});
  res.end(fs.readFileSync(p));
}).listen(port, ()=>console.log('Server running on', port));