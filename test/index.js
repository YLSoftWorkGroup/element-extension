/*
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2019-08-22 11:35:09
 * @LastEditTime: 2020-02-17 17:57:07
 */
import router from './router'
import App from './App.vue'
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  render: h => h(App)
})
