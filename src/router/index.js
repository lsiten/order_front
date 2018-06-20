import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/',
      component: resolve => require(['../pages/home.vue'], resolve),
      meta: {title: '自述文件'},
      children: [
        {
          path: '/home',
          component: resolve => require(['../pages/Home/index.vue'], resolve),
          meta: {title: '系统首页'}
        }
      ]
    }
  ]
})
