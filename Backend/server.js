// backend/server.js

const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const roomRoutes = require('./routes/roomRoutes');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());
app.use('/api/rooms', roomRoutes);

// WebSocket signaling logic
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Broadcast the message to other clients
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

mongoose.connect('mongodb://localhost:27017/video-streaming', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    server.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
}).catch(err => console.log(err));
