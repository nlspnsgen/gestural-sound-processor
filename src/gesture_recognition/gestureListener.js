import * as config from '../../config';
import { debugBreak } from '../utils';
import ball from './gesturesBall';
import sendOSCMessage from '../oscConnector';
import gesturesFunctional from './gesturesFunctional';

const last3HandStatesLeft = [0, 0, 0, 0, 0];
const last3HandStatesRight = [0, 0, 0, 0, 0];

let looping = false;
let handStateCounter = 0;

const gestureListener = (body) => {
  if (config.debug && debugBreak()) return; // slows down processing

  const { leftHandState, rightHandState } = body;

  // Sometimes the kinect data is a little noise, so we make sure the user really did mean to loop
  if (handStateCounter > 4) handStateCounter = 0;
  last3HandStatesLeft[handStateCounter] = leftHandState;
  last3HandStatesRight[handStateCounter] = rightHandState;
  handStateCounter += 1;

  if (!looping) {
    if (last3HandStatesLeft.every(currentValue => currentValue === 3)) {
      looping = true;
      console.log('looper on!');
      // sendOSCMessage('/looper', 1);
    }
  }

  if (looping) {
    if (last3HandStatesRight.every(currentValue => currentValue === 3)) {
      looping = false;
      console.log('looper off!');
      // sendOSCMessage('/looper', 0);
      // sendOSCMessage('/looper', 0);
    }
  }


  if (config.gestureSet === 'ball') {
    ball(body);
  } else {
    gesturesFunctional(body);
  }
};

export default gestureListener;
