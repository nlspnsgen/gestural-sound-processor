import { DEBUG, BALL_SIZE } from './constants';
import { debugBreak, round } from './utils';

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

const gestureListener = (bodyFrame) => {
  if (DEBUG && debugBreak()) return; // slows down console output
  const user = trackedBody(bodyFrame);

  if (user) {
    const leftHandX = round(user.joints[7].depthX);
    const leftHandY = round(user.joints[7].depthY);
    const rightHandX = round(user.joints[11].depthX);
    const rightHandY = round(user.joints[11].depthY);
    const handDistanceX = round(rightHandX - leftHandX); // 0 - 0.8
    const handDistanceY = round(rightHandY - leftHandY); // -0.6 < handDistanceY < 0.6
    console.log('Xdistance: ', handDistanceX);
    // if (handDistanceX <= BALL_SIZE) console.log('ball');
  }
};

export default gestureListener;
