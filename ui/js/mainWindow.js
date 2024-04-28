App.selectedPlatform = null

const actions = {
  async onCreateDefaultPlatforms() {
    let loadingMaskId = UI.HUD.showLoading(true)
    let defaultPlatforms = await window.mainApi?.platform?.createDefaultPlatforms()
    if (defaultPlatforms && defaultPlatforms.length > 0) {
      UI.EJS.render("#app-platforms", "appPlatformList", { platforms: defaultPlatforms })
    }
    UI.HUD.hide(loadingMaskId)
  },
  async onPlatformClick(platform) {
    if (App.selectedPlatform === platform) {
      return
    }
    let preSelectedPlatform = App.selectedPlatform
    if (preSelectedPlatform) {
      $("#platform-" + preSelectedPlatform).removeClass("active")
    }
    App.selectedPlatform = platform
    $("#platform-" + platform).addClass("active")
    let loadingMaskId = UI.HUD.showLoading(true)
    let games = await window.mainApi?.platform?.getPlatformGames(platform)
    UI.HUD.hide(loadingMaskId)
  },
  async onDocumentLoaded() {
    let loadingMaskId = UI.HUD.showLoading(true)
    let platforms = await window.mainApi?.platform?.getPlatforms()
    if (platforms && platforms.length > 0) {
      UI.EJS.render("#app-platforms", "appPlatformList", { platforms: platforms })
    } else {
      let askDialogId = UI.HUD.showDialog({
        content: "No platform found, create default platforms?",
        buttons: {
          "Yes": async () => {
            UI.HUD.hide(askDialogId)
            await actions.onCreateDefaultPlatforms()
          },
          "No": () => {
            UI.HUD.hide(askDialogId)
          }
        }
      })
    }
    UI.HUD.hide(loadingMaskId)
  }
}

App.actions = actions

$(actions.onDocumentLoaded)

