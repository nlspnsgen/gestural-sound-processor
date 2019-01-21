import * as config from '../../config';
import { debugBreak } from '../utils';
import ball from './gesturesBall';
import gesturesFunctional from './gesturesFunctional';

const gestureListener = (body) => {
  if (config.debug && debugBreak()) return; // slows down processing
  if (config.gestureSet === 'ball') {
    ball(body);
  } else {
    gesturesFunctional(body);
  }
};

export default gestureListener;
