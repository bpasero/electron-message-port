const { ipcRenderer } = require("electron")

ipcRenderer.on('port', event => {
  [port] = event.ports;

  port.onmessage = msg => console.log('From Renderer 1', msg.data);
  port.postMessage({ msg: 'Hello From Renderer 2' });
});
