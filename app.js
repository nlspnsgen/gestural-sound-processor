import Kinect2 from 'kinect2';
import WebSocket from 'ws';
import gestureListener from './src/gestureListener';

const kinect = new Kinect2();
const wss = new WebSocket.Server({ port: 8080 });


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
  ws.on('message', (message) => {
    console.log('received: %s', message);
  });

  ws.send('something');

  if (kinect.open()) {
    kinect.on('bodyFrame', (bodyFrame) => {
      const body = trackedBody(bodyFrame);
      if (body !== false) {
        gestureListener(body);
        ws.send(JSON.stringify(body));
      }
    });
    kinect.openBodyReader();
  }
});
