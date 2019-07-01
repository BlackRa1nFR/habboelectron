const { app, BrowserWindow,Menu } = require('electron');
const path = require('path')
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}
switch (process.platform) {
  case 'win32':
    pluginName = 'pepflashplayer.dll'
    pluginVersion = '20.0.0.306'
    break
  case 'darwin':
    pluginName = 'PepperFlashPlayer.plugin'
    pluginVersion = '32.0.0.207'
    break
}
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))
app.commandLine.appendSwitch('ppapi-flash-version',pluginVersion)
let mainWindow;
let menuTemplate = [
    {
      role: 'appMenu'
    },
    {
      role : "window"
    }
];
const createWindow = () => {
  mainWindow = new BrowserWindow({
    title: 'Holo Hotel',
    webPreferences: {
      plugins: true,
      nodeIntegration: true
    },
    show: false,
    frame: false,
    backgroundColor: '#000',
  });
  mainWindow.loadURL('https://holohotel.ca/electron')
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  mainWindow.maximize()
  mainWindow.show();
  let menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
};
app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
