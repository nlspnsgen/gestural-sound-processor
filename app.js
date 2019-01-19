import Kinect2 from 'kinect2';
import express from 'express';
import * as http from 'http';
import io from 'socket.io';
import gestureListener from './src/gestureListener';

const WebSocketServer = require('websocket').server;

const server = http.createServer((request, response) => {
  console.log(`${new Date()} Received request for ${request.url}`);
  response.writeHead(404);
  response.end();
});
server.listen(8080, () => {
  console.log(`${new Date()} Server is listening on port 8080`);
});

const wsServer = new WebSocketServer({
  httpServer: server,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: true,
});

function originIsAllowed(origin) {
  console.log(origin);
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

wsServer.on('request', (request) => {
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log(`${new Date()} Connection from origin ${request.origin} rejected.`);
    return;
  }

  const connection = request.accept('echo-protocol', request.origin);
  console.log(`${new Date()} Connection accepted.`);
  connection.on('message', (message) => {
    if (message.type === 'utf8') {
      console.log(`Received Message: ${message.utf8Data}`);
      connection.sendUTF(message.utf8Data);
    } else if (message.type === 'binary') {
      console.log(`Received Binary Message of ${message.binaryData.length} bytes`);
      connection.sendBytes(message.binaryData);
    }
  });
  connection.on('close', (reasonCode, description) => {
    console.log(`${new Date()} Peer ${connection.remoteAddress} disconnected.`);
  });
});


//   kinect.on('bodyFrame', (bodyFrame) => {
//     gestureListener(bodyFrame);
//   });


//   kinect.openBodyReader();
// }
