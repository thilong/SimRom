module.exports.Platform = class Platform {
    constructor(name, fullName, ext) {
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