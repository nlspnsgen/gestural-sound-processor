import websockets.*;
import java.util.Collections;
import java.util.Arrays;



WebsocketClient wsClient;
int leftHandState;
int rightHandState;
float leftHandX;
float leftHandY;
float rightHandX;
float rightHandY;
float centerX;
float centerY;
float radius;

int windowWidth = 800;
int windowHeight = 800;
JSONArray joints;

void setup(){
  fullScreen();
  background(0);
  fill(204, 102, 0);
  wsClient= new WebsocketClient(this, "ws://localhost:8080/kinect");
}

void draw(){
  if(joints != null){
  background(0);
  for (int i = 0; i < joints.size(); i++) {
    //draw skeleton
    try {
      float jointX = joints.getJSONObject(i).getFloat("depthX");
      float jointY = joints.getJSONObject(i).getFloat("depthY");
      if(i == 7) {
        leftHandX = jointX;
        leftHandY = jointY;
      }
      if (i == 11) {
        rightHandX = jointX;
        rightHandY = jointY;
      }
      fill(204, 102, 0);
      ellipseMode(CENTER);
      ellipse(jointX*width, jointY*height,10, 10);
    } catch (RuntimeException e) {
      e.printStackTrace();
    }
  }}
    //draw ball
    stroke(255);
    fill(255);
    strokeWeight(5);
    centerX = (rightHandX*width + leftHandX*width)/2;
    centerY = (rightHandY*height + leftHandY*height)/2;
    radius = this.getRadius(rightHandX, rightHandY, leftHandX, leftHandY);

    ellipse(centerX, centerY, radius, radius);
    line(leftHandX*width, leftHandY*height, rightHandX*width, rightHandY*height);
}

void webSocketEvent(String data){
  JSONObject json = parseJSONObject(data);
  if (json == null) {
    println("JSONObject could not be parsed");
    //this seems to be the only way to differentiate between messages
    // println(data);
  } else {
    this.setBodyData(json);
  }
}

void setBodyData(JSONObject body){
  this.leftHandState = body.getInt("leftHandState");
  this.rightHandState = body.getInt("rightHandState");
  joints = body.getJSONArray("joints");
}

float getRadius(float rightHandX, float rightHandY, float leftHandX, float leftHandY){
    float radius1 = rightHandX*width - leftHandX*width;
    float radius2 = leftHandX*width - rightHandX*width;
    float radius3 = rightHandY*width - leftHandY*width;
    float radius4 = leftHandY*width - rightHandY*width;
    float largest = Collections.max(Arrays.asList(radius1, radius2, radius3, radius4));
    return largest;
}
