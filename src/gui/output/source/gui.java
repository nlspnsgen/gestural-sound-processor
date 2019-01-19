import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import websockets.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class gui extends PApplet {



WebsocketClient wsc;
int now;
boolean newEllipse;

public void setup(){
  
  
  newEllipse=true;
  
  //Here I initiate the websocket connection by connecting to "ws://localhost:8025/john", which is the uri of the server.
  //this refers to the Processing sketch it self (you should always write "this").
  wsc= new WebsocketClient(this, "ws://localhost:8000");
  now=millis();
}

public void draw(){
    //Here I draw a new ellipse if newEllipse is true
  if(newEllipse){
    ellipse(random(width),random(height),10,10);
    newEllipse=false;
  }
    
    //Every 5 seconds I send a message to the server through the sendMessage method
  if(millis()>now+5000){
    wsc.sendMessage("Client message");
    now=millis();
  }
}

//This is an event like onMouseClicked. If you chose to use it, it will be executed whenever the server sends a message 
public void webSocketEvent(String msg){
 println(msg);
 newEllipse=true;
}
  public void settings() {  size(200,200); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "gui" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
