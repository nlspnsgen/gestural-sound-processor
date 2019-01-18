import Kinect2 from 'kinect2';
import gestureListener from './gestures/gestureListener';

const kinect = new Kinect2();


if (kinect.open()) {
  // request body frames
  kinect.openBodyReader();
  kinect.on('bodyFrame', (bodyFrame) => {
    gestureListener(bodyFrame);
  });


  // close the kinect after 5 seconds
  setTimeout(() => {
    kinect.close();
    console.log('Kinect Closed');
  }, 60000);
}
