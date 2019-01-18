import { BALL_SIZE } from './constants';

const ball = (distanceBetweenLeftHandAndTorso, distanceBetweenRightHandAndTorso) => {
  if (distanceBetweenLeftHandAndTorso < BALL_SIZE && distanceBetweenRightHandAndTorso < BALL_SIZE) {
    console.log('ball');
    return true;
  }
  return false;
};

export default ball;
