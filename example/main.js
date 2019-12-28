/*
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2019-08-22 11:35:09
 * @LastEditTime: 2019-12-28 17:22:26
 */
import Vue from 'vue'
import 'element-mini-ui/lib/theme/index.css'
import elementMini from 'element-mini-ui'
import 'highlight.js/styles/color-brewer.css'
import ylComponent from '../src/index.js'
import router from './router'
import './asset/style/index.css'
import App from './App.vue'
import DemoBlock from './components/demoBlock'
Vue.use(elementMini)
Vue.use(ylComponent)
Vue.component('demo-code', DemoBlock)
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  render: h => h(App)
})
