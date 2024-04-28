import * as fs from 'fs'
import * as path from 'path'

import { app, dialog, BrowserWindow } from 'electron'
import { appPaths } from '../simAppConfig'

export class MainWindow {

    romRoot: string
    window: BrowserWindow

    showErrorMessage(msg, exit = false) {
        dialog.showMessageBox({ type: "error", message: msg }).then(() => {
            if (exit) {
                app.quit()
            }
        })
    }

    pickWorkspace() {
        dialog.showOpenDialog({ properties: ['openDirectory', 'createDirectory'], message: "Please pick your roms folder." })
            .then((result) => {
                if (!result.canceled && result.filePaths.length > 0) {
                    global.workspace = result.filePaths[0]
                    console.log("[simrom]: workspace is %s", global.workspace)
                    const dataPath = path.join(app.getPath('userData'), '.simrom')
                    fs.writeFile(dataPath, global.workspace, (err) => {
                        console.log("[simrom]: workspace saved to %s , err: %s", dataPath, err == null ? "null" : err)
                    })
                    this.show(true)
                }
                else {
                    app.quit()
                }
            }).catch((err) => {
                console.log("[simrom]: error while picking workspace: %s", err)
                this.showErrorMessage("Please pick a workspace folder.", true)
            })
    }

    checkWorkspace() {
        const dataPath = path.join(app.getPath('userData'), '.simrom')
        try {
            fs.readFile(dataPath, 'utf8', (err, data) => {
                if (err) {
                    this.pickWorkspace()
                    return;
                }
                global.workspace = data
                console.log("[simrom]: workspace is %s", global.workspace)
                this.show(true)
            })
        } catch (e) {
            this.pickWorkspace()
        }
    }

    show(workspaceChecked : boolean = false) {
        if (workspaceChecked == false) {
            this.checkWorkspace()
            return
        }


        const preloadUrl = appPaths.pathFromPreload('mainWindow.js')
        this.window = new BrowserWindow({
            width: 1000,
            height: 800,
            minWidth: 1000,
            minHeight: 600,
            webPreferences: {
                preload: preloadUrl,
                sandbox: false,
            }
        })
        this.window.setMenu(null)
        this.window.loadFile(appPaths.pathFromUI('mainWindow.html'))
        this.window.webContents.openDevTools()
        this.window.on('closed', () => {
            this.window = null
        })
    }

}



