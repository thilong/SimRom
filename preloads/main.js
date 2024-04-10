const { contextBridge, ipcRenderer } = require('electron')
const { services, makeChannelName } = require('../services')

function createJsBridge() {
    const bridge = {};

    services.forEach((service) => {
        bridge[service.name] = {};

        Object.keys(service.functions).forEach((fnName) => {
            bridge[service.name][fnName] = (...args) =>
                ipcRenderer.invoke(makeChannelName(service.name, fnName), ...args);
        });
    });
    return bridge;
}

contextBridge.exposeInMainWorld('jsBridge', createJsBridge());