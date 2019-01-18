import ball from './ball';
import ballOutwardX from './ballOutwardX';
import { DEBUG } from './constants';
import { debugBreak, round } from './utils';

const oldSpeed = 0;
const userIsInformed = false;

const whichBodyIsTracked = (bodyFrame) => {
  let bodyTrackedIndex;
  bodyFrame.bodies.forEach((body) => {
    if (body.tracked) {
      bodyTrackedIndex = body.bodyIndex;
    }
  });
  return bodyTrackedIndex || false;
};

const gestureListener = (bodyFrame) => {
  if (DEBUG && debugBreak()) return;

  const user = bodyFrame.bodies[whichBodyIsTracked(bodyFrame.bodies)];
  if (user.tracked) {
    console.log('user tracked');
    const rightHandX = user.joints[11].depthX;
    const leftHandX = user.joints[7].depthX;
    console.log('left hand x', leftHandX);
    console.log('right hand x', rightHandX);
    console.log('rightX - leftX', rightHandX - leftHandX);
  }
};


// var index = 0;
// bodyFrame.bodies.forEach(function(body){
//   if(body.tracked) {
//     for(var jointType in body.joints) {
//       var joint = body.joints[jointType];
//       ctx.fillStyle = colors[index];
//       ctx.fillRect(joint.depthX * 512, joint.depthY * 424, 10, 10);
//     }
//     //draw hand states
//     updateHandState(body.leftHandState, body.joints[7]);
//     updateHandState(body.rightHandState, body.joints[11]);
//     index++;
//   }
// });

export default gestureListener;


// if (user && user.joints) {
//   if (!userIsInformed) {
//     console.log('User detected! ');
//     userIsInformed = true;
//   }
//   // torso
//   const torso = user.joints[1].depthX;
//   // waist
//   const waistY = user.joints[0].depthY;


//   // right Hand
//   const rightHandX = user.joints[11].depthX;
//   const rightHandY = user.joints[11].depthY;
//   const rightHandZ = user.joints[11].depthZ;
//   const distanceBetweenRightHandAndTorso = rightHandX - torso;
//   const distanceBetweenRightHandAndWaist = rightHandY - waistY;

//   // left Hand
//   const leftHandX = user.joints[7].depthX;
//   const leftHandY = user.joints[7].depthY;
//   const leftHandZ = user.joints[7].depthZ;
//   const distanceBetweenLeftHandAndTorso = torso - leftHandX;
//   const distanceBetweenLeftHandAndWaist = leftHandY - waistY;

//   const rightHandRelativeSpeed = distanceBetweenRightHandAndTorso - oldSpeed;
//   oldSpeed = distanceBetweenRightHandAndTorso;

//   ball(distanceBetweenLeftHandAndTorso, distanceBetweenRightHandAndTorso);
//   ballOutwardX(round(leftHandX), round(rightHandX));
// }
