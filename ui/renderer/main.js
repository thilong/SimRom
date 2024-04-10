

var appData = {
  platforms: [],
  categories: [],
  games: [],
  message: 'Hello Vue!'
}

function createTestData() {
  let cc = window.jsBridge.example.hello();
  console.log(`renderer.js loaded ${cc}`);
  appData.platforms.push({
    icon: "D:\\XJ.Workspace\\XiaojiAndroidEN\\xiaoji_android_en\\src\\main\\res\\drawable-mdpi\\ic_launcher.png",
    name: 'FC',
    selected: false
  })
  appData.platforms.push({
    icon: "D:\\XJ.Workspace\\XiaojiAndroidEN\\xiaoji_android_en\\src\\main\\res\\drawable-mdpi\\ic_launcher.png",
    name: 'SFC',
    selected: true
  })
  appData.categories.push({
    name: '全部游戏',
    selected: false
  })
  appData.categories.push({
    name: '角色扮演',
    selected: false
  })
  appData.categories.push({
    name: '吞食天地',
    selected: false
  })
}

$(async () => {
  createTestData()
  const app = Vue.createApp({
    data() {
      return appData
    }
  })
  app.mount('#app')
});

