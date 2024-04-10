const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const fs = require('node:fs')
const { services, makeChannelName } = require('./services')

function createMainWindow() {
    const preloadUrl = path.resolve(__dirname, 'preloads/main.js')
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        minWidth: 1000,
        minHeight: 600,
        webPreferences: {
            preload: preloadUrl,
            sandbox: false
        }
    })
    win.setMenu(null)
    win.loadFile('ui/main.html')
    //win.openDevTools()
}

function registerServices() {

    services.forEach((service) => {
        Object.entries(service.functions).forEach(([apiName, apiFn]) => {
            let channelName = makeChannelName(service.name, apiName)
            ipcMain.handle(channelName, (ev, ...args) =>
                apiFn(...args)
            );
        });
    });
}

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow()
    }
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.whenReady().then(() => {
    registerServices()
    const dataPath = path.join(app.getPath('userData'), '.simrom.db')
    //if dataPath exists, load it
    try {
        fs.accessSync(dataPath, fs.constants.F_OK)
        createMainWindow()
    } catch (e) {
        createMainWindow()
    }
})

