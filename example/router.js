import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Main = resolve => require(['./views/Main'], resolve)
export default new Router({
  routes: [{
    path: '/',
    name: 'main',
    component: Main,
    redirect: 'base',
    children: [{
      path: 'base',
      component: () => import('./views/page/base.md'),
      name: '基础'
    },
    {
      path: 'flexbox',
      component: () => import('./views/page/container/flexbox.md'),
      name: 'flexbox'
    },
    {
      path: 'pageheader',
      component: () => import('./views/page/container/pageheader.md'),
      name: 'pageheader'
    },
    {
      path: 'panel',
      component: () => import('./views/page/container/panel.md'),
      name: 'panel'
    },
    {
      path: 'toolbar',
      component: () => import('./views/page/container/toolbar.md'),
      name: 'toolbar'
    },
    {
      path: 'timebar',
      component: () => import('./views/page/form/timebar.md'),
      name: 'timebar'
    },
    {
      path: 'treeSelect',
      component: () => import('./views/page/form/treeSelect.md'),
      name: 'treeSelect'
    },
    {
      path: 'listn',
      component: () => import('./views/page/data/listn.md'),
      name: 'listn'
    },
    {
      path: 'tablen',
      component: () => import('./views/page/data/tablen.md'),
      name: 'tablen'
    },
    {
      path: 'other',
      component: () => import('./views/page/other/other'),
      name: '其他'
    },
    {
      path: 'log',
      component: () => import('./views/page/log.md'),
      name: '日志'
    },
    {
      path: 'markdown',
      component: () => import('./views/page/markdown.md'),
      name: 'markdown'
    },
    ]
  }]
})
