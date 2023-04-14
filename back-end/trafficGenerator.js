const serverAddressPort = {host: '127.0.0.1', port: 3000};

async function startTraffic(listPlayers) {
  
  const dgram = require('dgram');
  const UDPClientSocketTransmit = dgram.createSocket('udp4');

  while(true) 
  {
    let message, redID, blueID;

    redID = Math.floor(Math.random() * 15) + 1;
    blueID = Math.floor(Math.random() * 15) + 16;

    if(listPlayers[redID] != undefined && listPlayers[blueID] != undefined)
    {
      await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 3 + 1) * 1000));

      if(Math.floor(Math.random() * 2) == 0)
      {
        message = `${redID}:${blueID}`;
      }
      else
      {
        message = `${blueID}:${redID}`;
      }

      UDPClientSocketTransmit.send(Buffer.from(message), serverAddressPort.port);
      break;
    }
  }
}

module.exports = {
  startTraffic,
}