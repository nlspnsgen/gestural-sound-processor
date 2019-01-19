import sendOSCMessage from './oscConnector';
import { DEBUG, BALL_SIZE } from './constants';
import { debugBreak, round, numericMap } from './utils';

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
  const user = trackedBody(bodyFrame);

  if (user !== false) {
    const leftHandX = round(user.joints[7].depthX);
    const leftHandY = round(user.joints[7].depthY);
    const rightHandX = round(user.joints[11].depthX);
    const rightHandY = round(user.joints[11].depthY);
    const spineBaseY = round(user.joints[0].depthX);
    const handDistanceX = round(rightHandX - leftHandX); // goes from 0 to 0.8
    const handDistanceXWithBall = handDistanceX > BALL_SIZE ? handDistanceX : 0;
    const handDistanceY = round(rightHandY - leftHandY); // goes from about -0.8 to 0.8
    const rightHandUp = (spineBaseY - rightHandY) > BALL_SIZE - 0.02 ? spineBaseY - rightHandY : 0;
    const leftHandDown = (leftHandY - spineBaseY) > BALL_SIZE - 0.02 ? (leftHandY - spineBaseY) : 0;
    // console.log('rightHandUp: ', rightHandUp);
    // console.log('leftHandDown: ', leftHandDown);


    // right or left hand could be on top.
    // also, values smaller than ball size should be the new 0.
    let handDistanceNegativeY = 0;
    let handDistancePositiveY = 0;
    if (handDistanceY > 0) {
      handDistancePositiveY = handDistanceY > BALL_SIZE ? handDistanceY : 0;
    } else {
      handDistanceNegativeY = -handDistanceY > BALL_SIZE ? -handDistanceY : 0;
    }

    sendOSCMessage('/octaveUp', numericMap(rightHandUp, BALL_SIZE, 0.35, 0, 1));
    sendOSCMessage('/octaveDown', numericMap(leftHandDown, BALL_SIZE, 0.5, 0, 1));
    sendOSCMessage('/dubDelay', numericMap(handDistanceX, BALL_SIZE, 0.6, 0, 1));


    // console.log('/yDistancePositive', numericMap(handDistancePositiveY, BALL_SIZE, 0.6, 0, 127));
    // console.log('/yDistanceNegative', numericMap(handDistanceNegativeY, BALL_SIZE, 0.6, 0, 127));
  }
};

export default gestureListener;
