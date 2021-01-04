const { ipcRenderer } = require("electron");

const { port1, port2 } = new MessageChannel();
ipcRenderer.postMessage('port', null, [port2]);

port1.onmessage = msg => console.log('From Renderer 2', msg.data);
port1.postMessage({ msg: 'Hello From Renderer 1', some: /super/ });

console.log("sending port");
