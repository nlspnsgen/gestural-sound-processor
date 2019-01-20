/*
Our server starts in the following order:
1. open websocket server
2. start processing
3. listen for kinect data
*/

import Kinect2 from 'kinect2';
import WebSocket from 'ws';
import gestureListener from './src/gestureListener';

const kinect = new Kinect2();
const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log('wss server open');
});


let userInformed = false;

// returns the currently tracked body or false
const trackedBody = (bodyFrame) => {
  let bodyTrackedIndex;
  bodyFrame.bodies.forEach((body) => {
    if (body.tracked) {
      bodyTrackedIndex = body.bodyIndex;
    }
  });
  if (bodyTrackedIndex) return bodyFrame.bodies[bodyTrackedIndex];
  return false;
};

// waits for a connection to the gui before doing anything else.
wss.on('connection', (ws) => {
  console.log('ws connected');
  if (kinect.open()) {
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
    kinect.openBodyReader();
  }
});
