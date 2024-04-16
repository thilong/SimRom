const { app, BrowserWindow } = require('electron/main')
const { appPaths } = require('../appConfig')
const { dialog } = require('electron')
const path = require('node:path')
const fs = require('node:fs')

function showErrorMessage(msg, exit = false) {
    dialog.showErrorBox("Error", msg).then(() => {
        if (exit) {
            app.quit()
        }
    })
}

function pickWorkspace() {
    let openOption = { properties: ['openDirectory', 'createDirectory'], message: "Please pick your roms folder." }
    dialog.showOpenDialog(openOption).then((result) => {
        if (!result.canceled && result.filePaths.length > 0) {
            global.workspace = result.filePaths[0]
            console.log("[simrom]: workspace is %s", global.workspace)
            const dataPath = path.join(app.getPath('userData'), '.simrom')
            fs.writeFile(dataPath, global.workspace, (err) => {
                console.log("[simrom]: workspace saved to %s , err: %s", dataPath, err == null ? "null" : err)
            })
            createMainWindow(true)
        }
        else {
            app.quit()
        }
    }).catch((err) => {
        console.log("[simrom]: error while picking workspace: %s", err)
        showErrorMessage("Please pick a workspace folder.", true)
    })
}

function checkWorkspace() {
    const dataPath = path.join(app.getPath('userData'), '.simrom')
    try {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                pickWorkspace()
                return;
            }
            global.workspace = data
            console.log("[simrom]: workspace is %s", global.workspace)
            createMainWindow(true)
        })
    } catch (e) {
        pickWorkspace()
    }
}

function createMainWindow(workspaceChecked = false) {
    if (workspaceChecked == false) {
        checkWorkspace()
        return
    }

    const preloadUrl = appPaths.fromPreload('mainWindow.js')
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
    win.loadFile(appPaths.fromUI('mainWindow.html'))
    win.openDevTools()
}

module.exports.mainWindow = {
    create: createMainWindow
}