const { app, BrowserWindow, ipcMain } = require('electron/main')
const { registerServiceForMain } = require('./services')
const { mainWindow } = require('./window/mainWindow')

global.workspace = null

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        mainWindow.create()
    }
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.whenReady().then(() => {
    registerServiceForMain()
    mainWindow.create()
})
