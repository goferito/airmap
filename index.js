
// Dependencies
var http = require('http')
  , express = require('express')
  , socketio = require('socket.io')

// TODO take this from argv
var iface = 'wlan0' 
  , sendInterval = 1000 * 3

var app = express()
  , server = http.createServer(app)
  , io = socketio.listen(server)
  , capture = require('./capture')


// Set express server
app.set('views', './views');
app.set('view engine', 'jade');
app.get('/', function(req, res){
  res.render('index');
});

io.on('connection', function(socket){
  console.log('User connected!!');
  socket.on('disconnect', function(){
    console.log('user disconnected :/');
  });
});

server.listen(3000, function(){
  console.log("Express listening on port", server.address().port);
});

capture.start(io, iface, sendInterval);
