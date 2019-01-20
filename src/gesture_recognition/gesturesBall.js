import sendOSCMessage from '../oscConnector';
import { round, numericMap } from '../utils';
import { BALL_SIZE } from '../constants';

// Values smaller than ball size should be the new 0.
const getHandYPosition = (maxY, yPos) => ((maxY - yPos) > BALL_SIZE ? round(maxY - yPos) : 0);
const getInverseHandYPosition = (maxY, yPos) => ((maxY - yPos) < BALL_SIZE ? round(maxY - yPos) : 0);

const ball = (body) => {
  const leftHandX = round(body.joints[7].depthX);
  const leftHandY = round(body.joints[7].depthY);
  const rightHandX = round(body.joints[11].depthX);
  const rightHandY = round(body.joints[11].depthY);
  const spineBaseY = round(body.joints[0].depthX);
  const handDistanceX = round(rightHandX - leftHandX); // goes from about 0 to 0.8
  const handDistanceXWithBall = handDistanceX > BALL_SIZE ? handDistanceX : 0;
  const handDistanceY = round(rightHandY - leftHandY); // goes from about -0.8 to 0.8
  let lowerHand = getHandYPosition(spineBaseY, rightHandY);
  let upperHand = getHandYPosition(leftHandY, spineBaseY);

  // console.log('leftHandY: ', leftHandY);
  // console.log('rightHandY: ', rightHandY);
  // right or left hand could be on top.
  if (handDistanceY > 0) {
    // ws.send('negative');
    // console.log('NEGATIVE');
    lowerHand = getInverseHandYPosition(spineBaseY, leftHandY);
    upperHand = getHandYPosition(rightHandY, spineBaseY);
    // console.log('lowerHand left: ', lowerHand);
    // console.log('upperHand right: ', upperHand);
  } else {
    // console.log('lowerHand right: ', lowerHand);
    // console.log('upperHand left: ', upperHand);
  }
  //   sendOSCMessage('/octaveUp', numericMap(upperHand, BALL_SIZE, 0.35, 0, 1));
  //   sendOSCMessage('/octaveDown', numericMap(lowerHand, BALL_SIZE, 0.35, 0, 1));
  sendOSCMessage('/dubDelay', numericMap(handDistanceXWithBall, BALL_SIZE, 0.6, 0, 1));
};

export default ball;
