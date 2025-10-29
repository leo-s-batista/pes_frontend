import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '/src/views/Home'
import Voluntarios from '/src/views/Voluntarios'
import PessoasAtendidas from '/src/views/PessoasAtendidas'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/voluntarios',
    name: 'voluntarios',
    component: Voluntarios
  },
  {
    path: '/pessoas-atendidas',
    name: 'pessoas-atendidas',
    component: PessoasAtendidas
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

export default router