
//import('../vue-components/sidebar.vue')


var appData = {
  platforms: [],
  categories: [],
  games: [],
  message: 'Hello Vue!'
}

function createTestData() {
  //let cc = window.jsBridge.example.hello();
  //console.log(`renderer.js loaded ${cc}`);
  appData.platforms.push({
    icon: "D:\\XJ.Workspace\\XiaojiAndroidEN\\xiaoji_android_en\\src\\main\\res\\drawable-mdpi\\ic_launcher.png",
    name: 'FC',
    count: 100,
    selected: false
  })
  appData.platforms.push({
    name: 'SFC',
    count: 10,
    selected: true
  })
  appData.platforms.push({
    name: 'GBA',
    icon: "D:\\XJ.Workspace\\XiaojiAndroidEN\\xiaoji_android_en\\src\\main\\res\\drawable-mdpi\\ic_launcher.png",
    selected: false
  })
}

$(async () => {
  createTestData()

  renderEjs("#app-platforms", "appPlatformList", appData)

  let platforms = await window.jsBridge?.platform?.getWorkspacePlatforms();
  console.log(platforms)
});

