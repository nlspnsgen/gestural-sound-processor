import OSC from 'osc-js';
import * as config from '../config';


let isOpen = false;
const osc = new OSC({
  plugin: new OSC.DatagramPlugin({ send: { port: config.oscHost, host: config.oscPort } }),
});

osc.open();
osc.on('open', () => {
  isOpen = true;
});

const sendOSCMessage = (address, message) => {
  if (isOpen) {
    osc.send(new OSC.Message(address, message));
  }
};

export default sendOSCMessage;
