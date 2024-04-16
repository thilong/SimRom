const fs = require('node:fs')
const path = require('node:path')
const { appPaths, currentApp } = require('../appConfig');
const { defaultPlatforms } = require('../core/default_platforms');



module.exports.platformService = {
  name: 'platform',
  functions: {
    getDefaultPlatforms() {
      return defaultPlatforms;
    },
    async getWorkspacePlatforms() {
      let romsRoot = currentApp.getWorkspace()
      let platforms = []
      fs.readdir(romsRoot, (err, files) => {

        files.forEach(file => {
          let filePath = path.join(romsRoot, file, "meta/.sim.json")
          fs. (filePath, (err, stat) => {
            if (!err && stat && stat.isFile()) {
              console.log("files: ", filePath)
            }
          })
        })
      })
      return platforms
    },
    createPlatform(name) {
      let romsRoot = currentApp.getWorkspace()

    }
  }
};
