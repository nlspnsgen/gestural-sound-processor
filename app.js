/*
server lifecycle:
1. open websocket server
2. start processing
3. connect to processing
4. listen for kinect data
*/
import Kinect2 from 'kinect2';
import WebSocket from 'ws';
import { exec } from 'child_process';
import gestureListener from './src/gestureListener';

const kinect = new Kinect2();
let userInformed = false;

const wss = new WebSocket.Server({ port: 8080, path: '/kinect' }, () => {
  console.log('websocket server open');
  // start processing. You need to set your own processing env variable and change this path to your own.
  exec('%processing% --sketch="C:/Users/Poensgen/Desktop/gestural-sound-processor/src/gui" --output="C:/Users/Poensgen/Desktop/gestural-sound-processor/src/gui/output" --force --run',
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
});


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
