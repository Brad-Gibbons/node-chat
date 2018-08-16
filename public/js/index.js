var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMsg', function(msg) {
    console.log('New Message', msg);
    var li = jQuery('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);

    jQuery('#messages').append(li);
})

socket.on('newLocMsg', function(msg) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${msg.from}:`);
    a.attr('href', msg.url);
    li.append(a);
    jQuery('#messages').append(li);
});
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMsg', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });
})

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if(!navigator.geolocation) {
        return alert('Cannot send location');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocMsg', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function() {
        alert('Unable to fetch location')
    })
});