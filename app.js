import Kinect2 from 'kinect2';
import express from 'express';
import * as http from 'http';
import io from 'socket.io';
import gestureListener from './gestures/gestureListener';

const kinect = new Kinect2();
const app = express();
const server = http.createServer(app);
const socketIo = io.listen(server);


if (kinect.open()) {
  server.listen(8000);
  console.log('Server listening on port 8000');
  console.log('Point your browser to http://localhost:8000');

  app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
  });

  kinect.on('bodyFrame', (bodyFrame) => {
    gestureListener(bodyFrame);
    socketIo.sockets.emit('bodyFrame', bodyFrame);
  });


  kinect.openBodyReader();

  // close the kinect after 5 seconds
  setTimeout(() => {
    kinect.close();
    console.log('Kinect Closed');
  }, 60000);
}
