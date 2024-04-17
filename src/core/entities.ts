export class Platform {
    name: string
    fullName: string
    ext: string
    icon: string
    gameCount: number

    path: string


    constructor(name: string = null, fullName: string = null, ext: string = null) {
        this.name = name;
        this.fullName = fullName;
        this.ext = ext;
        this.icon = null;
        this.gameCount = 0;

    }

    withExt(ext) {
        this.ext = ext;
        return this;
    }

}

export class Game {
    name: string
    platform: string
    path: string
    icon: string
    constructor(name: string = null, platform: string = null, path: string = null) {
        this.name = name;
        this.platform = platform;
        this.path = path;
        this.icon = null;
    }
}

export class SimConfig {
    romsRoot: string
    excludeFolder: string = "meta media"
}