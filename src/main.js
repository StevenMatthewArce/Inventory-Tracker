const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Global reference of the window object
let mainWindow;

function createWindow() {
  // Create browser window
  mainWindow = new BrowserWindow({width: 1024, height: 768, frame: false  });

  const startURL = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true,
  });
  // load the index.html
  mainWindow.loadURL('http://localhost:3000');

  // Open devtools
  mainWindow.webContents.openDevTools();

  // Emitted when window is closed
  mainWindow.on('closed', function() {
    // Dereference the window object
    mainWindow = null;
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});