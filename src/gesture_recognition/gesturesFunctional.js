import sendOSCMessage from '../oscConnector';
import { round, numericMap } from '../utils';

const last3HandStatesLeft = [0, 0, 0, 0, 0];
const last3HandStatesRight = [0, 0, 0, 0, 0];

let looping = false;
let handStateCounter = 0;


const functionalGestures = (body) => {
  const leftHandX = round(body.joints[7].depthX);
  const leftHandY = round(1 - body.joints[7].depthY);
  const rightHandX = round(body.joints[11].depthX);
  const rightHandY = round(1 - body.joints[11].depthY);
  const spineBaseY = round(1 - body.joints[0].depthY);
  const spineShoulderY = round(1 - body.joints[20].depthY);
  const handDistanceX = round(rightHandX - leftHandX);
  const { leftHandState, rightHandState } = body;

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


  console.log(body.leftHandState);

  sendOSCMessage('/dubDelay', numericMap(handDistanceX, 0, 0.6, 0, 1));

  sendOSCMessage('/octaveUp', numericMap(rightHandY, spineBaseY, spineShoulderY, 0, 1));
  sendOSCMessage('/octaveDown', numericMap(leftHandY, spineBaseY, spineShoulderY, 0, 1));
};


export default functionalGestures;
