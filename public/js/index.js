var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    socket.emit('createMsg', {
        to: 'jen@example.com',
        text: 'test 123'
    })
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMsg', function(msg) {
    console.log('New Message', msg)
})