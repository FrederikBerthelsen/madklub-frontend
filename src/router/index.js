import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/log-in',
    name: 'log-in',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/LogInView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/createschema',
    name: 'create-schema',
    component: () => import('../views/CreateSchemaView.vue'),
    meta: {
      requireLogin: true,
      requireStaff: true,
    }
  },

]

function routerGuard(to, from, next) {
  if (to.matched.some(record => record.meta.requireLogin)) {
    if (!store.state.isAuthenticated) {
      next({ name: 'log-in', query: { to: to.path } })
    } else if (to.matched.some(record => record.meta.requireStaff)) {
      if (store.state.isStaff) {
        next()
      } else {
        next({ name: 'home' })
      }
    } else {
      next()
    }
  } else {
    next()
  }
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (from === VueRouter.START_LOCATION) {
    store.dispatch('initializeStore').then(() => {
      routerGuard(to, from, next)
    })
  } else {
    routerGuard(to, from, next)
  }

})

export default router
