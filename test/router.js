/*
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2020-02-16 23:59:04
 * @LastEditTime: 2020-02-17 22:29:22
 */
import page from './page.vue'
Vue.use(VueRouter)
export default new VueRouter({
  routes: [{
    path: '/',
    name: 'page',
    component: page,
  }]
})