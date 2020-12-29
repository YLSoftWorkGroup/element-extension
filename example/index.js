/*
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2019-08-22 11:35:09
 * @LastEditTime: 2020-02-17 17:57:07
 */
import 'highlight.js/styles/color-brewer.css'
import router from './router'
import './asset/style/index.css'
import App from './App.vue'
import DemoBlock from './components/demoBlock'
Vue.component('demo-code', DemoBlock)
// import elementExtension from '../lib/element-extension/element-extension.js'
// import '../lib/element-extension/element-extension.css'
// console.log(elementExtension)
// Vue.use(elementExtension)
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  render: h => h(App)
})
