import { DEBUG } from '../constants';
import { debugBreak } from '../utils';
import ball from './gesturesBall';

const gestureListener = (body) => {
  if (DEBUG && debugBreak()) return; // slows down processing
  ball(body);
};

export default gestureListener;
