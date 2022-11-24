import App from './App'
// #ifndef VUE3
import Vue from 'vue'
import publicTools from './common/tool.js'
import domain from "./common/globalVariable.js"
Vue.prototype.publicTools = publicTools;// 挂载公共方法
Vue.prototype.domain = domain;
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif