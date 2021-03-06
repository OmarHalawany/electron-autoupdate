const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

    mainWindow.once('ready-to-show', () => {
        console.log("Update sh");
        autoUpdater.checkForUpdatesAndNotify();
    });
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() });
});
ipcMain.on('restart_app', () => {
    console.log("quit")
    autoUpdater.quitAndInstall();
});
autoUpdater.on('update-available', () => {
    console.log("Update av");
    mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
    console.log("Update dw");
    mainWindow.webContents.send('update_downloaded');
});

