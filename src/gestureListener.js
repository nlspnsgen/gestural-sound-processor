import { DEBUG } from './constants';
import { debugBreak } from './utils';
import ball from './gesturesBall';

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
  if (DEBUG && debugBreak()) return; // slows down processing
  const body = trackedBody(bodyFrame);
  if (body !== false) {
    ball(body);
  }
};

export default gestureListener;
