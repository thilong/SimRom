import { contextBridge } from 'electron'
import { createExposeApiForRenderer } from '../service'

contextBridge.exposeInMainWorld('mainApi', createExposeApiForRenderer());