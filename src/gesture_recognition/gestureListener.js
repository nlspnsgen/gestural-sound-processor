import { DEBUG, gestureSet } from '../constants';
import { debugBreak } from '../utils';
import ball from './gesturesBall';
import gesturesFunctional from './gesturesFunctional';

const gestureListener = (body) => {
  if (DEBUG && debugBreak()) return; // slows down processing
  if (gestureSet === 'BALL') {
    ball(body);
  } else {
    gesturesFunctional(body);
  }
};

export default gestureListener;
