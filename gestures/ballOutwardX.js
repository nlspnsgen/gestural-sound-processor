import { BALL_SIZE } from './constants';

let oldLeftHandX;
let oldRightHandX;

const ballOutwardX = (leftHandX, rightHandX) => {
// first we need know the distance from the ball
  const distanceBetweenBallAndLeftHand = leftHandX - BALL_SIZE;
  console.log('leftHandX', leftHandX);
  console.log('distanceBetweenBallAndLeftHand: ', distanceBetweenBallAndLeftHand);

  oldLeftHandX = leftHandX;
  oldRightHandX = rightHandX;
};

export default ballOutwardX;
