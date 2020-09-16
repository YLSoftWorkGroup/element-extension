/*
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2019-08-22 11:35:09
 * @LastEditTime: 2020-02-17 17:57:07
 */
import Vue from 'vue'
import 'highlight.js/styles/color-brewer.css'
import 'element-mini-ui/lib/theme/index.css'
import elementMini from 'element-mini-ui'
import elementExtension from '../src/index.js'
import router from './router'
import './asset/style/index.css'
import App from './App.vue'
import DemoBlock from './components/demoBlock'
Vue.use(elementMini)
Vue.use(elementExtension)
Vue.component('demo-code', DemoBlock)
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  render: h => h(App)
})
