// this is a simple websocket server

import WebSocket from 'ws';
import gestureListener from './src/gestureListener';

const wss = new WebSocket.Server({ port: 8080 });


// waits for a connection to the gui before doing anything else.
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received: %s', message);
  });

  kinect.on('bodyFrame', (bodyFrame) => {
    const body = trackedBody(bodyFrame);
    if (body !== false) {
      if (!userInformed) {
        console.log('we are getting data from your body!');
        userInformed = true;
      }
      gestureListener(body);
      ws.send(JSON.stringify(body));
    }
  });
});
