const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');
const {generateMsg, generateLocMsg} = require('./utils/message');


var app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app)
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMsg', generateMsg('Admin', 'Welcome to the chat'));
    
    socket.broadcast.emit('newMsg', generateMsg('Admin', 'New User Joined'));

    socket.on('createMsg', (newMsg, callback) => {
        console.log('createMsg', newMsg);
        io.emit('newMsg', generateMsg(newMsg.from, newMsg.text))
        callback('This is from the server');
        // socket.broadcast.emit('newMsg', {
        //     from: newMsg.from,
        //     text: newMsg.text,
        //     createdAt: new Date().getTime()
        // })
    })
    socket.on('createLocMsg', (coords) => {
        io.emit('newLocMsg', generateLocMsg('Admin', coords.latitude, coords.longitude))
    })
    socket.on('disconnect', (socket) => {
        console.log('User disconnected');
    })
});



app.use(express.static(publicPath));
server.listen(port, () => {
    console.log(`Started at port ${port}`);
});