import { Platform } from './entities'

export const defaultPlatforms = {
    nes: new Platform("nes", "Nintendo Entertainment System").withExt(".nes .zip .7z"),   //fc, nes
    snes: new Platform("snes", "Super Nintendo Entertainment System").withExt(".sms .zip .7z"),    //sfc, snes
    md: new Platform("md", "Sega Mega Drive").withExt(".md .zip .7z"),    //md, smd, gen
    threedo: new Platform("3do", "3DO Interactive Multiplayer").withExt(".iso .zip .7z"),
    n64: new Platform("n64", "Nintendo 64").withExt(".n64 .zip .7z"),
    ss: new Platform("ss", "Sega Saturn").withExt(".iso .zip .7z"),
    psx: new Platform("psx", "Sony PlayStation").withExt(".iso .zip .7z"),
    dc: new Platform("dc", "Sega Dreamcast").withExt(".cdi .zip .7z"),
    ngc: new Platform("ngc", "Nintendo GameCube").withExt(".iso .zip .7z"),
    wii: new Platform("wii", "Nintendo Wii").withExt(".iso .zip .7z"),
    ps2: new Platform("ps2", "Sony PlayStation 2").withExt(".iso .zip .7z"),
    xbox360: new Platform("xbox360", "Microsoft Xbox 360").withExt(".iso .zip .7z"),
    wiiu: new Platform("wiiu", "Nintendo Wii U").withExt(".iso .zip .7z"),
    arcade: new Platform("arcade", "Arcade").withExt(".zip .7z"),


    gb: new Platform("gb", "Nintendo - Game Boy").withExt(".gb .gbc .zip .7z .dmg"),
    gbc: new Platform("gb", "Nintendo - Game Boy Color").withExt(".gb .gbc .zip .7z .dmg"),
    gba: new Platform("gba", "Nintendo - Game Boy Advance").withExt(".gba .zip .7z .dmg"),  
    ws: new Platform("ws", "WonderSwan").withExt(".ws .zip .7z"),
    wsc: new Platform("wsc", "WonderSwan Color").withExt(".wsc .zip .7z"),
    nds : new Platform("nds", "Nintendo DS").withExt(".nds .zip .7z"),
    psp: new Platform("psp", "Sony PlayStation Portable").withExt(".iso .zip .7z"),
    psv: new Platform("psv", "Sony PlayStation Vita").withExt(".vpk .zip .7z"),
    threeds: new Platform("3ds", "Nintendo 3DS").withExt(".3ds .zip .7z"),

}