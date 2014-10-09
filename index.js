
// Dependencies
var http = require('http')
  , path = require('path')
  , express = require('express')
  , socketio = require('socket.io')
  , cmd = require('commander')
  

cmd.option('-i, --iface <name>', 'Interface listening in monitor mode')
   .option('-s, --send <secs>',  'Interval to send data to the client')
   .parse(process.argv)

if(!cmd.iface) cmd.help();

var iface = cmd.iface
  , sendInterval = 1000 * cmd.send

var app = express()
  , server = http.createServer(app)
  , io = socketio.listen(server)
  , capture = require('./capture')


// Set up express server
app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname + '/public')));

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

