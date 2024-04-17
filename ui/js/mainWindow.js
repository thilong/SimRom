function onPlatformClick(platform) {
  alert(platform)
}

$(async () => {

  let platforms = await window.mainApi?.platform?.getWorkspacePlatforms()
  if (platforms) {
    renderEjs("#app-platforms", "appPlatformList", { platforms: platforms })
  }
});

