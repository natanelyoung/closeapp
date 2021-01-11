import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home'
import Login from './views/Login'
import Signup from './views/Signup'

// import Soon from '../views/comingSoon.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
          path:'/login',
          name:'login',
          component: Login,
      },
      {
        path:'/signup',
        name:'signup',
        component: Signup,
    }
]

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
  })
  

  