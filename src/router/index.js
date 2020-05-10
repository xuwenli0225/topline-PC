import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(VueRouter)
const routes = [
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('@/views/welcome')
      },
      { path: '/account', name: 'account', component: () => import('@/views/account/account.vue') },
      { path: '/fans', name: 'fans', component: () => import('@/views/fans/fans.vue') },
      { path: '/material', name: 'material', component: () => import('@/views/material/material.vue') },
      { path: '/article', name: 'article', component: () => import('@/views/article') },
      { path: '/articleadd', name: 'articleadd', component: () => import('@/views/articleadd/articleadd.vue') },
      { path: '/articleedit/:aid', name: 'articleedit', component: () => import('@/views/articleedit/articleedit.vue') },
      { path: '/articledetail/:aid', name: 'articledetail', component: () => import('@/views/articledetail/articledetail.vue') }
    ]
  }
]
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  NProgress.inc()
  const userinfo = sessionStorage.getItem('userinfo')
  if (!userinfo && to.path !== '/login') {
    next('/login')
  }
  next()
})
router.afterEach(() => {
  NProgress.done()
})
export default router
