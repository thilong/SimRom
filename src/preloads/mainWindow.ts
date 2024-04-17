import { contextBridge, ipcRenderer } from 'electron'
import { createExposeApiForRenderer } from '../service'

contextBridge.exposeInMainWorld('mainApi', createExposeApiForRenderer())
