const express = require('express');
const { createServer } = require('node:http');
const path = require('node:path');
const { join } = require('node:path');
const { Server } = require('socket.io');
const WebSocket = require('ws');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use('/src', express.static(path.join(__dirname, '../src')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'));
})

io.on('connection', (socket) => {
    console.log('a user connected');
    

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('data', (data) => {
        users.push(data);
        io.emit('user', data);
    });
});


server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
})