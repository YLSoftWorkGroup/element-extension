import Vue from 'vue'
import Router from 'vue-router'
import menuData from './views/data/menuData.json'
Vue.use(Router)

function getRouter () {
  const routeList = []
  menuData.map((i, index) => {
    if (i.url) {
      const item = {
        path: i.name,
        component: () => import('./views/page/' + i.name + '.md'),
        name: i.label
      }
      routeList.push(item)
    } else {
      i.children.map((ii, iindex) => {
        if (ii.url) {
          const item = {
            path: ii.name,
            component: () => import('./views/page/' + ii.name + '.md'),
            name: ii.label
          }
          routeList.push(item)
        }
      })
    }
  })
  return routeList
}
const Main = resolve => require(['./views/Main'], resolve)
export default new Router({
  routes: [{
    path: '/',
    name: 'main',
    component: Main,
    redirect: 'base',
    children: getRouter()
  }]
})
