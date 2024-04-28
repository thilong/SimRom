const { app, BrowserWindow } = require('electron/main')
import { registerServiceForMain } from './service'
import { MainWindow } from './window/mainWindow'

export class SimApp {
    mainWindow: MainWindow

    constructor() {
        this.mainWindow = new MainWindow()
        app.on('ready', () => this.onReady())
        app.on('activate', () => this.onActivate())
        app.on('window-all-closed', () => this.onWindowAllClosed())
    }

    onActivate() {
        if (BrowserWindow.getAllWindows().length === 0) {
            this.showMainWindow()
        }
    }

    onReady() {
        registerServiceForMain()
        this.showMainWindow()
    }

    onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    }

    showMainWindow(){
        if(!this.mainWindow){
            this.mainWindow = new MainWindow()
        }
        this.mainWindow.show()
    }

}

