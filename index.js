if (process.env.NODE_ENV === 'development') {
  console.log('Running in development mode.');
  require('electron-reload')(__dirname);
}

const electron = require('electron');
const path = require('path');
const windowStateKeeper = require('electron-window-state');
// Module to control application life.
const {app, ipcMain} = electron;
// Module to create native browser window.
const {BrowserWindow} = electron;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
function createWindow() {

    const mainWindowState = windowStateKeeper({
      defaultWidth: 660,
      defaultHeight: 165,
      file: 'electron-timer-app-window-state.json',
    });

  win = new BrowserWindow({
    alwaysOnTop: true,
    titleBarStyle: 'hidden', // MacOS
    x : mainWindowState.x,
    y : mainWindowState.y,
    width : mainWindowState.width,
    height : mainWindowState.height,
    backgroundColor: '#113A47',
    // frame: false,
    resizable: true,
    icon: path.join(__dirname, 'assets/icon-1024.png'),
    title: 'Electron Timer',
  });

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/index.html`);
  // Open the DevTools.
  // win.webContents.openDevTools();
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
  win.setMenu(null);

  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }
  mainWindowState.manage(win);
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
