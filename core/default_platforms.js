const { Platform } = require('./entities');

module.exports.defaultPlatforms = {
    nes: new Platform("nes", "Nintendo Entertainment System").withExt(".nes"),
    snes: new Platform("snes", "Super Nintendo Entertainment System").withExt(".sms")
}