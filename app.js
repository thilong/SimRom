const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const { services, makeChannelName } = require('./services')

global.projectRoot = path.resolve(__dirname, '.')


function createWindow() {
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
    win.openDevTools()
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
        createWindow()
    }
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.whenReady().then(() => {
    registerServices()
    createWindow()

})

