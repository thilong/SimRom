const path = require('node:path')
const fs = require('node:fs')

const _root = path.resolve(__dirname, '.')
const _windows = path.resolve(__dirname, 'windows')
const _preloads = path.resolve(__dirname, 'preloads')
const _ui = path.resolve(__dirname, 'ui')
const _core = path.resolve(__dirname, 'core')

module.exports.appPaths = {
    fromRoot: function (subPath) {
        return path.resolve(_root, subPath)
    },
    fromWindow: function (subPath) {
        return path.resolve(_windows, subPath)
    },
    fromPreload: function (subPath) {
        return path.resolve(_preloads, subPath)
    },
    fromUI: function (subPath) {
        return path.resolve(_ui, subPath)
    },
    fromCore: function (subPath) {
        return path.resolve(_core, subPath)
    }
}

module.exports.currentApp = {
    getWorkspace() {
        return global.workspace
    }
}