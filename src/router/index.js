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
        },
        {
          path: '/order',
          component: resolve => require(['../pages/Order/index.vue'], resolve),
          meta: {title: '订单确认页面'}
        },
        {
          path: '/orderlist',
          name: 'orderlist',
          component: resolve => require(['../pages/user/orderlist.vue'], resolve),
          meta: {title: '订单确认页面'}
        }
      ]
    },
    {
      path: '/error',
      name: 'error',
      component: resolve => require(['../pages/error.vue'], resolve),
      meta: {title: '错误页面'}
    }
  ]
})
