const LightChain = require('./LightChain');
const Transaction = require('./Transaction');

// Initialize blockchain
const lightChain = new LightChain();

console.log('Light Blockchain initialized');
console.log('Mining genesis block...');

// Start local server for testing
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/chain') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(lightChain.chain));
  } else {
    res.writeHead(404);
    res.end();
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Use /chain endpoint to view the blockchain');
});
