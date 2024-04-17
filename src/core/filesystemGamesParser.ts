import * as fs from 'node:fs'
import * as path from 'node:path'
import { Game, Platform } from './entities'


export class FilesystemGamesParser {
    private readonly platform: Platform
    private games: Array<Game> = []

    constructor(platform: Platform) {
        this.platform = platform
    }

    reparse() {
        //remove all games from games array
        this.games = []
        this.parse(this.platform.path)
    }

    parse(folder: string = null) {
        if (!folder) {
            folder = this.platform.path
        }
        fs.readdirSync(folder).forEach(file => {
            let subPath = path.join(folder, file)
            let stat = fs.statSync(subPath)
            if (stat.isDirectory()) {
                this.parse(subPath)
                return //continue loop
            }
            if (!stat.isFile()) {
                return //continue loop, only deal with files
            }

            let ext = path.extname(subPath)
            if (this.platform.ext.indexOf(ext) === -1) {
                return //continue loop, only deal with files with the right extension
            }

            let game = new Game()
            game.path = subPath
            game.name = path.basename(subPath, ext)
            game.platform = this.platform.name
            this.games.push(game)
        })
    }

    
}