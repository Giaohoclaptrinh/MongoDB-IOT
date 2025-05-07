import express from 'express';
import mongoose from 'mongoose';
import path, { join } from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import main from './router/index.js';
import { startWebSocketServer } from './websocket/websocket.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 1. Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/your-database-name')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// 2. Middleware cơ bản
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

// 3. Cấu hình view (Handlebars)
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', join(__dirname, 'views'));

// 4. Route chính
main(app);

// 5. Tạo server HTTP để kết hợp với WebSocket
import http from 'http';
const server = http.createServer(app);

// 6. Khởi động WebSocket Server
startWebSocketServer(server);

// 7. Khởi chạy server
const PORT = process.env.PORT || 1969;
server.listen(PORT, () => {
  console.log(`HTTP/WebSocket server running at http://localhost:${PORT}`);
});
