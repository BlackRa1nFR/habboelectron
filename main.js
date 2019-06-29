// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
let pluginName
switch (process.platform) {
  case 'win32':
    pluginName = 'pepflashplayer.dll'
    pluginVersion = '17.0.0.134'
    break
  case 'darwin':
    pluginName = 'PepperFlashPlayer.plugin'
    pluginVersion = '32.0.0.207'
    break
}
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))
app.commandLine.appendSwitch('ppapi-flash-version',pluginVersion)

app.on('ready', () => {
  let win = new BrowserWindow({
    title: "Holo Hotel",
    webPreferences: {
      plugins: true,
      nodeIntegration: true
    },
    show: false,
    frame: false,
    backgroundColor: '#000',

  })
  win.on('closed', () => {
    win = null
  })
  win.removeMenu()
  win.loadURL(`https://holohotel.ca/electron`)
  win.maximize()
  win.show();
})
