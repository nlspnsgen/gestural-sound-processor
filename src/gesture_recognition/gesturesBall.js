/*
This models the behaviour of having a physical,
stretchable ball in the users hands.
"ballSize" set in config is a safe distance between
the hands, where all effects are off.

The kinect coordinate system:
y:
(0, 0)              (1, 0)
 |--|--|--|--|--|--|--|
 |--|--|--|--|--|--|--|
 |--|--|--|--|--|--|--|
 |--|--|--|--|--|--|--|
 |--|--|--|--|--|--|--|
(0, 1)              (1, 1)
*/

import sendOSCMessage from '../oscConnector';
import { round, numericMap } from '../utils';
import * as config from '../../config';

const last3HandStatesLeft = [0, 0, 0, 0, 0];
const last3HandStatesRight = [0, 0, 0, 0, 0];

let looping = false;
let handStateCounter = 0;

const ball = (body) => {
  const leftHandX = round(body.joints[7].depthX);
  const rightHandX = round(body.joints[11].depthX);
  const leftHandY = round(1 - body.joints[7].depthY); // the coordinate system is inverted.
  const rightHandY = round(1 - body.joints[11].depthY);

  const leftHandZ = round(body.joints[7].cameraZ);
  const rightHandZ = round(body.joints[11].cameraZ);
  const spineBaseY = round(1 - body.joints[0].depthY);
  const spineMidZ = round(body.joints[1].cameraZ);
  const { leftHandState, rightHandState } = body;

  const averageDistanceToSpineZ = spineMidZ - (leftHandZ + rightHandZ) / 2;


  const handDistanceX = round(rightHandX - leftHandX);
  const handDistanceXWithBall = handDistanceX > config.ballSize ? handDistanceX : 0;
  const upperHand = Math.max(leftHandY, rightHandY);
  const upperHandDistanceToSpineY = upperHand - spineBaseY;
  sendOSCMessage('/octaveUp', numericMap(upperHandDistanceToSpineY, config.ballSize, 0.4, 0, 1));
  sendOSCMessage('/octaveDown', numericMap(averageDistanceToSpineZ, config.ballSize + 0.1, 0.4, 0, 1));
  sendOSCMessage('/dubDelay', numericMap(handDistanceXWithBall, config.ballSize, 0.4, 0, 1));


  if (handStateCounter > 4) handStateCounter = 0;
  last3HandStatesLeft[handStateCounter] = leftHandState;
  last3HandStatesRight[handStateCounter] = rightHandState;
  handStateCounter += 1;

  if (!looping) {
    if (last3HandStatesLeft.every(currentValue => currentValue === 3)) {
      looping = true;
      console.log('looper on!');
      sendOSCMessage('/looper', 1);
    }
  }

  if (looping) {
    if (last3HandStatesRight.every(currentValue => currentValue === 3)) {
      looping = false;
      console.log('looper off!');
      sendOSCMessage('/looper', 0);
    }
  }
};

export default ball;
