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
String gestureSet;
JSONObject config;
JSONArray joints;

void setup(){
  fullScreen();
  background(0);
  fill(204, 102, 0);
  config = loadJSONObject("../../config.json");
  wsClient= new WebsocketClient(this, "ws://localhost:" +  config.getInt("webSocketPort") + "/kinect");
  gestureSet = config.getString("gestureSet");
}

void draw(){
  if(joints != null){
    background(0);
    if(gestureSet.equals("ball")){
      this.renderBall();
    } else {
      this.renderSkeleton();
    }
  }
}

void renderBall() {
    leftHandX = joints.getJSONObject(7).getFloat("depthX");
    leftHandY = joints.getJSONObject(7).getFloat("depthY");
    rightHandX = joints.getJSONObject(11).getFloat("depthX");
    rightHandY = joints.getJSONObject(11).getFloat("depthY");
    centerX = (rightHandX*width + leftHandX*width)/2;
    centerY = (rightHandY*height + leftHandY*height)/2;
    radius = this.getRadius(rightHandX, rightHandY, leftHandX, leftHandY);
    stroke(255);
    fill(255);
    strokeWeight(5);
    ellipse(centerX, centerY, radius, radius);
    line(leftHandX*width, leftHandY*height, rightHandX*width, rightHandY*height);
}

void renderSkeleton() {
  for (int i = 0; i < joints.size(); i++) {
    try {
      float jointX = joints.getJSONObject(i).getFloat("depthX");
      float jointY = joints.getJSONObject(i).getFloat("depthY");
      fill(204, 102, 0);
      ellipseMode(CENTER);
      ellipse(jointX*width, jointY*height,10, 10);
    } catch (RuntimeException e) {
      e.printStackTrace();
    }
  }
}

void webSocketEvent(String data){
  JSONObject json = parseJSONObject(data);
  if (json == null) {
    println("JSONObject could not be parsed");
  } else {
    this.setBodyData(json);
  }
}

void setBodyData(JSONObject body){
  this.leftHandState = body.getInt("leftHandState");
  this.rightHandState = body.getInt("rightHandState");
  joints = body.getJSONArray("joints");
}

//util function for renderBall()
float getRadius(float rightHandX, float rightHandY, float leftHandX, float leftHandY){
    float radius1 = rightHandX*width - leftHandX*width;
    float radius2 = leftHandX*width - rightHandX*width;
    float radius3 = rightHandY*width - leftHandY*width;
    float radius4 = leftHandY*width - rightHandY*width;
    float largest = Collections.max(Arrays.asList(radius1, radius2, radius3, radius4));
    return largest;
}