/* server lifecycle:
1. open websocket server
2. start processing
3. connect to processing
4. listen for kinect data
5. close kinect on exit
*/
import Kinect2 from 'kinect2';
import WebSocket from 'ws';
import exitHook from 'exit-hook';
import { fork } from 'child_process';
import gestureListener from './src/gesture_recognition/gestureListener';
import * as config from './config';

const kinect = new Kinect2();
let userInformed = false;

const wss = new WebSocket.Server({ port: config.webSocketPort, path: '/kinect' }, () => {
  console.log('websocket server open');
  // start processing on a new thread
  fork('./src/processingStart.js');
});


// returns the currently tracked body or false
const trackedBody = (bodyFrame) => {
  let bodyTrackedIndex;
  bodyFrame.bodies.forEach((body) => {
    if (body.tracked) {
      bodyTrackedIndex = body.bodyIndex;
    }
  });
  if (bodyTrackedIndex !== undefined) return bodyFrame.bodies[bodyTrackedIndex];
  return false;
};

wss.on('connection', (ws) => {
  console.log('websocket connected to processing');
  if (kinect.open()) {
    kinect.on('bodyFrame', (bodyFrame) => {
      const body = trackedBody(bodyFrame);
      if (body !== false) {
        if (!userInformed) {
          console.log('kinect body detected');
          userInformed = true;
        }
        gestureListener(body);
        ws.send(JSON.stringify(body));
      }
    });
    kinect.openBodyReader();
  }
});

exitHook(() => {
  console.log('exiting...');
  kinect.close();
});
