// Modules to control application life and create native browser window
const { app, BrowserWindow, MessageChannelMain, ipcMain } = require('electron')
const path = require('path')

function createWindow() {
  // Create the browser window.
  const mainWindow1 = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload1.js')
    }
  })

  // and load the index.html of the app.
  mainWindow1.loadFile('index1.html')

  const mainWindow2 = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload2.js')
    }
  })

  // and load the index.html of the app.
  mainWindow2.loadFile('index2.html')
  // Open the DevTools.
  mainWindow1.webContents.openDevTools()
  mainWindow2.webContents.openDevTools()


  // setTimeout(() => {
  //   console.log("sendin ports");

  //   const { port1, port2 } = new MessageChannelMain();
  //   mainWindow1.webContents.postMessage('port', null, [port1]);
  //   mainWindow2.webContents.postMessage('port', null, [port2]);

  //   // port1.postMessage({ some: 'message' });
  //   // port2.postMessage({ some: 'message' });
  // }, 1000);

ipcMain.on('port', e => {
  mainWindow2.webContents.postMessage('port', null, e.ports);
});


}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
