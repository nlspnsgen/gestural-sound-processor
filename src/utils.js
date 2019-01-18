// slows down output
let debugCounter = 0;
export const debugBreak = () => {
  debugCounter += 1;
  if (debugCounter >= 10) {
    debugCounter = 0;
    return false;
  }
  return true;
};

// rounds floats to 2 integers
export const round = num => Math.round(num * 1000) / 1000;
