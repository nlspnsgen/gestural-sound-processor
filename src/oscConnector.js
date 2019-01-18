import OSC from 'osc-js';

let isOpen = false;

const osc = new OSC({
  plugin: new OSC.DatagramPlugin({ send: { port: 10001, host: '127.0.0.1' } }),
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
