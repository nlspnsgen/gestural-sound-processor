import sendOSCMessage from '../oscConnector';
import { round, numericMap } from '../utils';
import * as config from '../../config';

const ball = (body) => {
  const leftHandX = round(body.joints[7].depthX);
  const leftHandY = round(body.joints[7].depthY);
  const rightHandX = round(body.joints[11].depthX);
  const rightHandY = round(body.joints[11].depthY);
  const handDistanceX = round(rightHandX - leftHandX); // goes from about 0 to 0.8
  const handDistanceXWithBall = handDistanceX > config.ballSize ? handDistanceX : 0;
  const lowerHand = Math.max(leftHandX, rightHandY);
  const upperHand = Math.min(leftHandY, rightHandY);

  sendOSCMessage('/octaveUp', numericMap(upperHand, config.ballSize, 0.35, 0, 1));
  sendOSCMessage('/octaveDown', numericMap(lowerHand, config.ballSize, 0.35, 0, 1));
  sendOSCMessage('/dubDelay', numericMap(handDistanceXWithBall, config.ballSize, 0.6, 0, 1));
};

export default ball;
