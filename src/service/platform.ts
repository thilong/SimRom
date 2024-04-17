import * as fs from 'node:fs'
import * as path from 'node:path'
import { appPaths } from '../simAppConfig'
import { defaultPlatforms } from '../core/defaultPlatforms'
import { Platform } from '../core/entities'

function parsePlatformFromMetaFile(filePath, romFolder) {
  let fileContent = fs.readFileSync(filePath, 'utf8')
  let meta = JSON.parse(fileContent)
  if (meta) {
    let platform = new Platform()
    Object.assign(platform, meta)
    if (platform.name) {
      platform.icon = appPaths.checkPath(path.join(romFolder, "meta/system.png"))
      if (!platform.icon) {
        platform.icon = appPaths.checkPath(path.join(romFolder, "meta/system.jpg"))
      }
      return platform
    }
  }
  return null
}

export const platformService = {
  name: 'platform',
  functions: {
    getDefaultPlatforms() {
      return defaultPlatforms;
    },
    async getWorkspacePlatforms() {
      let romsRoot = appPaths.getWorkspace()
      let platforms = []
      let files = fs.readdirSync(romsRoot)
      files.forEach(file => {
        let filePath = path.join(romsRoot, file, "meta/system.json")
        if (!fs.existsSync(filePath)) {
          return
        }
        let romFolder = path.join(romsRoot, file)
        let platform = parsePlatformFromMetaFile(filePath, romFolder)
        if (platform) {
          platforms.push(platform)
        }
      })
      //console.log("getWorkspacePlatforms: ", platforms)
      return platforms
    },
    createPlatform(name) {
      let romsRoot = appPaths.getWorkspace()

    }
  }
}
