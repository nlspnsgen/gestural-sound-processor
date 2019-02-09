import sendOSCMessage from '../oscConnector';
import { round, numericMap } from '../utils';

const functionalGestures = (body) => {
  const leftHandX = round(body.joints[7].depthX);
  const leftHandY = round(1 - body.joints[7].depthY);
  const rightHandX = round(body.joints[11].depthX);
  const rightHandY = round(1 - body.joints[11].depthY);
  const spineBaseY = round(1 - body.joints[0].depthX);
  const spineShoulderY = round(1 - body.joints[20].depthY);
  const handDistanceX = round(rightHandX - leftHandX);
  const { rightHandState, leftHandState } = body;

  sendOSCMessage('/dubDelay', numericMap(handDistanceX, 0, 0.6, 0, 1));

  sendOSCMessage('/octaveUp', numericMap(rightHandY, spineBaseY, spineShoulderY, 0, 1));
  sendOSCMessage('/octaveDown', numericMap(leftHandY, spineBaseY, spineShoulderY, 0, 1));
};


export default functionalGestures;
