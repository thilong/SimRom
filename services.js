const { exampleService } = require('./service/example')
const { ejsService } = require('./service/ejs')
const { platformService } = require('./service/platform')
const { ipcMain, ipcRenderer } = require('electron/main')


const appServices = [
  exampleService,
  ejsService,
  platformService
]

const serviceMakeChannelName = function (name, fnName) {
  return `${name}.${fnName}`;
}

module.exports.registerServiceForMain = function () {
  appServices.forEach((service) => {
    Object.entries(service.functions).forEach(([apiName, apiFn]) => {
      let channelName = serviceMakeChannelName(service.name, apiName)
      ipcMain.handle(channelName, (ev, ...args) =>
        apiFn(...args)
      );
    });
  });
}

module.exports.createExposeApiForRenderer = function () {
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

module.exports.services = appServices

module.exports.makeChannelName = serviceMakeChannelName