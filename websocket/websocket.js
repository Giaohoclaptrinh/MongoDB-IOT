// websocket.js
import { WebSocketServer } from 'ws';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Set để lưu trữ các WebSocket client
const clients = new Set();

// Kết nối WebSocket
wss.on('connection', (ws) => {
  console.log('Client connected');
  clients.add(ws);

  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });
});

// Đặt route để nhận dữ liệu từ webhook
app.use(express.json());
app.post('/webhook', (req, res) => {
  const data = req.body;
  console.log('Received from TTN:', data);

  // Broadcast dữ liệu đến tất cả WebSocket client
  clients.forEach((client) => {
    if (client.readyState === 1) {  // Kiểm tra trạng thái kết nối WebSocket
      client.send(JSON.stringify(data));
    }
  });

  res.sendStatus(200); // Trả về 200 OK khi nhận được dữ liệu
});

export const startWebSocketServer = () => {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`WebSocket server running on port ${PORT}`);
  });
};
