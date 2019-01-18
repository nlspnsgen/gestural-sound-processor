import ball from './ball';

let oldSpeed = 0;

const gestureListener = (bodyFrame) => {
  const user = bodyFrame.bodies[0];

  if (user && user.joints) {
    // torso
    const torsoPosition = user.joints[1].depthX;
    // waist
    const waistYPosition = user.joints[0].depthY;


    // right Hand
    const rightHandXPosition = user.joints[11].depthX;
    const rightHandYPosition = user.joints[11].depthY;
    const rightHandZPosition = user.joints[11].depthZ;
    const distanceBetweenRightHandAndTorso = rightHandXPosition - torsoPosition;
    const distanceBetweenRightHandAndWaist = rightHandYPosition - waistYPosition;

    // left Hand
    const leftHandPosition = user.joints[7].depthX;
    const leftHandYPosition = user.joints[7].depthY;
    const leftHandZPosition = user.joints[7].depthZ;
    const distanceBetweenLeftHandAndTorso = torsoPosition - leftHandPosition;
    const distanceBetweenLeftHandAndWaist = leftHandYPosition - waistYPosition;

    const rightHandRelativeSpeed = distanceBetweenRightHandAndTorso - oldSpeed;
    oldSpeed = distanceBetweenRightHandAndTorso;


    console.log('---------');
    // console.log("right hand: " + rightHandXPosition);
    // console.log("torso: " + torsoPosition);
    // console.log("right hand distance to torso: " + distanceBetweenRightHandAndTorso);
    // console.log("old speed: " + oldSpeed);
    // console.log("right hand relative speed: " + rightHandRelativeSpeed);
    // console.log("left hand: " + leftHandPosition);
    // console.log("left hand distance to torso: " + distanceBetweenLeftHandAndTorso);

    // console.log('waistYPosition: ', waistYPosition);
    // console.log('rightHandYPosition', rightHandYPosition);
    // console.log('leftHandYPosition: ', leftHandYPosition);
    // console.log('distance between waist and right hand', distanceBetweenRightHandAndWaist);
    // console.log('distance between waist and left hand', distanceBetweenLeftHandAndWaist);

    if (rightHandRelativeSpeed < -0.02) {
      // Swipe left
      console.log('right hand left swipe');
    }

    if (rightHandRelativeSpeed > 0.02) {
      console.log('right hand right swipe');
      // Swipe right
    }

    ball(distanceBetweenLeftHandAndTorso, distanceBetweenRightHandAndTorso);
  }
};

export default gestureListener;
