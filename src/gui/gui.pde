import websockets.*;

WebsocketClient wsClient;
int leftHandState;
int rightHandState;
float leftHandX;
float leftHandY;
float rightHandX;
float rightHandY;

int windowWidth = 800;
int windowHeight = 800;
JSONArray joints;

void setup(){
  fullScreen();
  background(0);
  fill(204, 102, 0);
  wsClient= new WebsocketClient(this, "ws://localhost:8080/");
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
      rect(jointX*width, jointY*height,10, 10);
    } catch (RuntimeException e) {
      e.printStackTrace();
    }
  }}
    //draw ball
    stroke(255);
    fill(255);
    strokeWeight(5);
    line(leftHandX*width, leftHandY*height, rightHandX*width, rightHandY*height);
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
