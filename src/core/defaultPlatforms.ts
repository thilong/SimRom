import { Platform } from './entities'

export const defaultPlatforms = {
    nes: new Platform("nes", "Nintendo Entertainment System").withExt(".nes"),
    snes: new Platform("snes", "Super Nintendo Entertainment System").withExt(".sms")
}