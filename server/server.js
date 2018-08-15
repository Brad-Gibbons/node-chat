const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');



var app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app)
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMsg', {
        from: 'Admin',
        text: 'Welcome to the chat'
    });
    
    socket.broadcast.emit('newMsg', {
        from: 'Admin',
        text: 'New User has joined'
    });

    socket.on('createMsg', (newMsg) => {
        console.log('createMsg', newMsg);
        io.emit('newMsg', {
            from: newMsg.from,
            text: newMsg.text,
            createdAt: new Date().getTime()
        })
        // socket.broadcast.emit('newMsg', {
        //     from: newMsg.from,
        //     text: newMsg.text,
        //     createdAt: new Date().getTime()
        // })
    })
    socket.on('disconnect', (socket) => {
        console.log('User disconnected');
    })
});



app.use(express.static(publicPath));
server.listen(port, () => {
    console.log(`Started at port ${port}`);
});