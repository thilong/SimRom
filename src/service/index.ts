import { exampleService } from './example'
import { ejsService } from './ejs'
import { platformService } from './platform'
import { ipcMain, ipcRenderer } from 'electron'

const appServices = [
    exampleService,
    ejsService,
    platformService
]

const serviceMakeChannelName = function (name, fnName) {
    return `${name}.${fnName}`;
}

export function registerServiceForMain() {
    appServices.forEach((service) => {
        Object.entries(service.functions).forEach(([apiName, apiFn]) => {
            let channelName = serviceMakeChannelName(service.name, apiName)
            ipcMain.handle(channelName, (ev, ...args) =>
                apiFn(args)
            );
        });
    });
}

export function createExposeApiForRenderer() {
    const bridge = {};
    appServices.forEach((service) => {
        bridge[service.name] = {};

        Object.keys(service.functions).forEach((fnName) => {
            bridge[service.name][fnName] = (...args) =>
                ipcRenderer.invoke(serviceMakeChannelName(service.name, fnName), ...args);
        });
    });
    return bridge;
}
