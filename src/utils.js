// slows down output
let debugCounter = 0;
export const debugBreak = () => {
  debugCounter += 1;
  if (debugCounter >= 15) {
    debugCounter = 0;
    return false;
  }
  return true;
};

// rounds floats to 3 integers
export const round = num => Math.round(num * 1000) / 1000;

// converts a value from one numeric range to another
export const numericMap = (value, inLow, inHigh, outLow, outHigh) => {
  // sometimes kinect gives us unreasonable floats.
  let filteredValue = value;
  if (filteredValue < inLow) filteredValue = inLow;
  if (filteredValue > inHigh) filteredValue = inHigh;
  const out = outLow + ((outHigh - outLow) / (inHigh - inLow)) * (filteredValue - inLow);
  return out;
};
