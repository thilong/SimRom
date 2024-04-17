export class Platform {
    name: string
    fullName: string
    ext: string
    icon: string
    gameCount: number



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