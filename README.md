# Air Map
Network tool to display a map of the pakets flowing through a wireless
interface listening on monitor mode.

*Only tested on ubuntu 12.04*

## Get it working
1. Clone the repository

2. Make sure you have pcap installed
  ```
  # apt-get install libpcap-dev
  ```
3. `npm install`

4. Put a wireless interface on monitor mode:
  ```sh
  # ifconfig wlan0 down
  # iwconfig wlan mode monitor
  ```
5. `node index.js`

6. Open the browser on the Express listening port (3000 by default)

## License
MIT
