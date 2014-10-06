# Air Map
Network tool to display a map of the pakets flowing through a wireless
interface listening on monitor mode.

* Only tested on ubuntu 12.04 *

## Get it working
1. Make sure you have pcap installed
2. `npm install`
3. Put a wireless interface on monitor mode:
```sh
# ifconfig wlan0 down
# iwconfig wlan mode monitor
```
4. `node index.js`
5. Open the browser on the Express listening port (3000 by default)

## License
MIT
