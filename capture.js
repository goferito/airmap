
// Require dependencies
var pcap = require('pcap');

/**
 * Starts listening on the specified iface, and sends the paket summary
 * through io every sendInterval ms
 * @param Socket.io io         SocketIO instance to emit events to the connected
 *                             clients
 * @param String iface         Interface listening on monitor mode
 * @param Number sendInterval  Number of millisecond for the interval to send
 *                             the event with the new data
 */
var start = function(io, iface, sendInterval){

  var pcapSession = pcap.createSession(iface)
    , collector = {}

  console.log('Listening on ', pcapSession.device_name);

  pcapSession.on('packet', function(raw){

    var packet;

    try{
      packet = pcap.decode.packet(raw)
    }catch(e){
      //TODO check all these errors
      //console.error(e);
    }

    if(!packet) return;

    if(!packet.link.ieee802_11Frame){
      return console.error('ERROR no shost in captured paket. Please, make sure '
                         + 'the listening interface is in monitor mode.');
    }

    var shost = packet.link.ieee802_11Frame.shost
      , dhost = packet.link.ieee802_11Frame.dhost
      , bssid = packet.link.ieee802_11Frame.bssid
      , bytes = packet.pcap_header.len
      , time =  packet.pcap_header.time_ms


    if(bssid == 'ff:ff:ff:ff:ff:ff') return;

    if(!collector[bssid]){
      collector[bssid] = {
        packets: 0,
        bytes: 0,
        shosts: {},
        dhosts: {}
      };
    }
    collector[bssid].packets++;
    collector[bssid].bytes += bytes;

    if(!collector[bssid].shosts[shost]){
      collector[bssid].shosts[shost] = {
        packets: 0,
        bytes: 0
      };
    }
    collector[bssid].shosts[shost].packets++;
    collector[bssid].shosts[shost].bytes += bytes;

    if(!collector[bssid].dhosts[dhost]){
      collector[bssid].dhosts[dhost] = {
        packets: 0,
        bytes: 0
      };
    }
    collector[bssid].dhosts[dhost].packets++;
    collector[bssid].dhosts[dhost].bytes += bytes;

  });
  

  // Update clients through socket.io
  setInterval(function(){
    io.emit('map', {map: collector});
  }, sendInterval);

};


module.exports = {
  start: start
};

