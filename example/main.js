import Vue from 'vue'
import 'element-mini-ui/lib/theme/index.css'
import elementMini from 'element-mini-ui'
import 'highlight.js/styles/color-brewer.css'
import ylComponent from '../src/index.js'
import router from './router'
import './asset/style/index.css'
import App from './App.vue'
import DemoBlock from './components/demoBlock'
import VueAMap from 'vue-amap'
Vue.use(elementMini)
Vue.use(ylComponent)
Vue.component('demo-code', DemoBlock)
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '6ee9a3644c56a3b842a2ac09d3b2b24d',
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
    'AMap.Geocoder',
    'AMap.Geolocation'
  ],
  //  默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  render: h => h(App)
})
