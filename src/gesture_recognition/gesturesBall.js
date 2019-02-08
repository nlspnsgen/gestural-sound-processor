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

const ball = (body) => {
  const leftHandX = round(body.joints[7].depthX);
  const rightHandX = round(body.joints[11].depthX);
  const leftHandY = round(1 - body.joints[7].depthY); // the coordinate system is inverted.
  const rightHandY = round(1 - body.joints[11].depthY);

  const spineMidZ = round(body.joints[1].cameraZ);
  const leftHandZ = round(body.joints[7].cameraZ);
  const rightHandZ = round(body.joints[11].cameraZ);

  const averageDistanceToSpine = spineMidZ - (leftHandZ + rightHandZ) / 2;


  const handDistanceX = round(rightHandX - leftHandX);
  const handDistanceXWithBall = handDistanceX > config.ballSize ? handDistanceX : 0;
  const upperHand = Math.max(leftHandY, rightHandY);


  sendOSCMessage('/octaveUp', numericMap(upperHand, config.ballSize, 0.2, 0, 1));
  sendOSCMessage('/octaveDown', numericMap(averageDistanceToSpine, config.ballSize, 0.6, 0, 1));
  sendOSCMessage('/dubDelay', numericMap(handDistanceXWithBall, config.ballSize, 0.4, 0, 1));
};

export default ball;
