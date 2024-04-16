const fs = require('node:fs')
const { appPaths, currentApp } = require('../appConfig');
const { defaultPlatforms } = require('../core/default_platforms');
module.exports.platformService = {
  name: 'platform',
  functions: {
    getDefaultPlatforms() {
      return defaultPlatforms;
    },
    getWorkspacePlatforms() {
      let romsRoot = currentApp.getWorkspace()

    },
    createPlatform(name) {
      let romsRoot = currentApp.getWorkspace()
      
    }
  }
};
