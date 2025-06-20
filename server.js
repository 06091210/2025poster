const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 静的HTMLを返す
app.use(express.static(path.join(__dirname, 'public')));

// WebSocket通信
wss.on('connection', (ws) => {
  console.log('New client connected');
  ws.on('message', (msg) => {
    console.log('Received:', msg);
    // 全クライアントに送信
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
