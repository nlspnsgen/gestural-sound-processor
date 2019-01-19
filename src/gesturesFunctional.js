import sendOSCMessage from './oscConnector';
import { round, numericMap } from './utils';

const functionalGestures = (body) => {
  const leftHandX = round(body.joints[7].depthX);
  const leftHandY = round(body.joints[7].depthY);
  const rightHandX = round(body.joints[11].depthX);
  const rightHandY = round(body.joints[11].depthY);
  const spineBaseY = round(body.joints[0].depthX);
  const headY = round(body.joints[3].depthY);
  const handDistanceX = round(leftHandX - rightHandX);
  const { rightHandState, leftHandState } = body;

  if ((rightHandState || leftHandState) === 0) {
    sendOSCMessage('/dubDelay', numericMap(handDistanceX, 0, 0.6, 0, 1));
  }
  sendOSCMessage('/octaveUp', numericMap(rightHandY, spineBaseY, headY, 0, 1));
  sendOSCMessage('/octaveDown', numericMap(leftHandY, spineBaseY, headY, 0, 1));
};


export default functionalGestures;
