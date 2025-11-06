import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './src/store/store.js'

import Home from '/src/views/Home'
import Voluntarios from '/src/views/Voluntarios'
import PessoasAtendidas from '/src/views/PessoasAtendidas'
import Gestor from '/src/views/Gestor'
import Login from '/src/views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/voluntarios',
    name: 'voluntarios',
    component: Voluntarios,
    meta: { requiresAuth: true }
  },
  {
    path: '/pessoas-atendidas',
    name: 'pessoas-atendidas',
    component: PessoasAtendidas,
    meta: { requiresAuth: true }
  },
  {
    path: '/gestores',
    name: 'gestores',
    component: Gestor,
    meta: { requiresAuth: true, requiresRole: 'gestor' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresRole = to.matched.some(record => record.meta.requiresRole)
  
  if (requiresAuth) {
    const isAuthenticated = await store.dispatch('auth/checkAuth')
    
    if (!isAuthenticated) {
      next('/login')
    } else {
      if (requiresRole) {
        const userTipo = store.getters['auth/tipo']
        const requiredRole = to.matched.find(record => record.meta.requiresRole)?.meta.requiresRole
        
        if (userTipo !== requiredRole) {
          next('/')
        } else {
          next()
        }
      } else {
        next()
      }
    }
  } else {
    if (to.path === '/login') {
      const isAuthenticated = await store.dispatch('auth/checkAuth')
      if (isAuthenticated) {
        next('/')
      } else {
        next()
      }
    } else {
      next()
    }
  }
})

export default router