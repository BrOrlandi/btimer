const electron = require('electron');
const path = require('path');
// Module to control application life.
const {app, ipcMain} = electron;
// Module to create native browser window.
const {BrowserWindow} = electron;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    alwaysOnTop: true,
    titleBarStyle: 'hidden', // MacOS
    width: 500,
    height: 100,
    x: 120,
    y: 120,
    backgroundColor: '#113A47',
    // frame: false,
    resizable: true,
    icon: path.join(__dirname, 'assets/icon-1024.png'),
    title: 'Electron Timer',
  });

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/app/index.html`);
  // Open the DevTools.
  // win.webContents.openDevTools();
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
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

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)  // prints "ping"
  // event.sender.send('asynchronous-reply', 'pong')
  if(arg === 'menu'){
    const {Menu, MenuItem} = electron

    const menu = new Menu()
    menu.append(new MenuItem({label: 'MenuItem1x', click() { console.log('item 1 clicked') }}))
    menu.append(new MenuItem({type: 'separator'}))
    menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}))
    menu.popup(win);
  }
})
