const { app, BrowserWindow, ipcMain } = require('electron/main')
const { dialog } = require('electron')
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

function goPickWorkspace() {
    let openOption = { properties: ['openDirectory', 'createDirectory'], message: "Please pick your roms folder." }
    dialog.showOpenDialog(openOption).then((result) => {
        if(!result.canceled && result.filePaths.length > 0) {
            global.workspace = result.filePaths[0]
            console.log("[simrom]: workspace is %s", global.workspace)
            const dataPath = path.join(app.getPath('userData'), '.simrom')
            fs.writeFile(dataPath, global.workspace, (err) => {
                console.log("[simrom]: workspace saved to %s , err: %s", dataPath , err == null ? "null" : err)
            })
            createMainWindow()
        }
        else{
            app.quit()
        }
    }).catch((err) => {
        showOpenWorkspaceErrorAndExit()
    })
}

function showOpenWorkspaceErrorAndExit() {
    dialog.showErrorBox("Error", "Please pick a workspace folder.").then(() => {
        app.quit()
    })
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
    const dataPath = path.join(app.getPath('userData'), '.simrom')
    try {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                goPickWorkspace()
                return;
            }
            global.workspace = data
            console.log("[simrom]: workspace is %s", global.workspace)
            createMainWindow()
        })
    } catch (e) {
        goPickWorkspace()
    }
})

