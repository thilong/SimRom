

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
    selected : false
  })
  appData.platforms.push({
    icon: "D:\\XJ.Workspace\\XiaojiAndroidEN\\xiaoji_android_en\\src\\main\\res\\drawable-mdpi\\ic_launcher.png",
    name: 'SFC',
    selected : true
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

