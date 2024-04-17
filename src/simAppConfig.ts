
import * as path from 'node:path'
import * as fs from 'node:fs'

class SimAppConfig {
    private _srcRoot: string
    private _ui: string

    constructor() {
        this._srcRoot = path.resolve(__dirname, '.')
        this._ui = path.resolve(__dirname, '../ui')
    }

    pathFromSrcRoot(subPath: string): string {
        return path.resolve(this._srcRoot, subPath)
    }
    pathFromWindow(subPath: string): string {
        return path.resolve(this._srcRoot, "window", subPath)
    }

    pathFromPreload(subPath: string): string {
        return path.resolve(this._srcRoot, "preloads", subPath)
    }

    pathFromUI(subPath: string): string {
        return path.resolve(this._ui, subPath)
    }

    pathFromCore(subPath: string): string {
        return path.resolve(this._srcRoot, "core", subPath)
    }

    getWorkspace() {
        return global.workspace
    }

    checkPath(path: string) {
        if (fs.existsSync(path)) {
            return path
        }
        return null
    }

}

export const appConfig: SimAppConfig = new SimAppConfig()

export const appPaths: SimAppConfig = appConfig
