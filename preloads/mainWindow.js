const { contextBridge, ipcRenderer } = require('electron')
const { createExposeApiForRenderer } = require('../services.js')

contextBridge.exposeInMainWorld('jsBridge', createExposeApiForRenderer());