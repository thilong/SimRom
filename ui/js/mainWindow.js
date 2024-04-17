const app = {
  selectedPlatform: null,

}

const actions = {
  async onPlatformClick(platform) {
    if (app.selectedPlatform === platform) {
      return
    }
    let preSelectedPlatform = app.selectedPlatform
    if(preSelectedPlatform){
      $("#platform-" + preSelectedPlatform).removeClass("active")
    }
    app.selectedPlatform = platform
    $("#platform-" + platform).addClass("active")

    let games = await window.mainApi?.platform?.getPlatformGames(platform)
    
  }
}



$(async () => {
  let platforms = await window.mainApi?.platform?.getPlatforms()
  if (platforms) {
    renderEjs("#app-platforms", "appPlatformList", { platforms: platforms })
  }
});

