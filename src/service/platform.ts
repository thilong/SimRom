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
      return Object.values(defaultPlatforms);
    },
    async getPlatforms() {
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
      //console.log("getPlatforms: ", platforms)
      return platforms
    },
    async createPlatform(name) {
      let romsRoot = appPaths.getWorkspace()

    },
    async createDefaultPlatforms() {
      //return all values in defaultPlatforms
      let platforms = Object.values(defaultPlatforms);
      platforms.forEach(platform => {
        let romsRoot = appPaths.getWorkspace()
        let platformFolder = path.join(romsRoot, platform.name)
        if (!fs.existsSync(platformFolder)) {
          fs.mkdirSync(platformFolder)
        }
        let metaFile = path.join(platformFolder, "meta")
        if (!fs.existsSync(metaFile)) {
          fs.mkdirSync(metaFile)
        }
        let metaFilePath = path.join(metaFile, "system.json")
        if (!fs.existsSync(metaFilePath)) {
          fs.writeFileSync(metaFilePath, JSON.stringify(platform, null, 2))
        }
      })
      return platforms
    },
    async getPlatformGames(platform) {

    },
    async parseGamesFromMetaFile(platform) {

    }
  }
}
