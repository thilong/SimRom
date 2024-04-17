import { Game } from "./entities"


export class GameListParser {
    xmlPath: string
    games: Array<Game> = []

    constructor(xmlPath: string) {
        this.xmlPath = xmlPath
    }

    parse() {
        return []
    }

    getGames(): Array<Game> {
        return this.games
    }

    save() {
    }
}