import Default from '../layouts/default.vue'
import Home from '../components/index.vue'
import Register from '../components/Auth/Register/index.vue'
import Login from '../components/Auth/index.vue'

// Needs Auth
  import Dashboard from '../components/Dashboard/index.vue'
// Needs Auth

export default [
  {
    path: '/',
    component: Default,
    children: [
      { path: '', component: Home, name: 'home',
          meta: {
            guest: true,
            needsAuth: false
          }
    }
    ],
  },
  {
    path: '/login',
    component: Default,
    children: [
      { path: '', component: Login, name: 'login',
      meta: {
        guest: true,
        needsAuth: false
      }
    }
    ],
  },
  {
    path: '/register',
    component: Default,
    children: [
      { path: '', component: Register, name: 'register',
      meta: {
        guest: true,
        needsAuth: false
      }
    }
    ],
  },
  {
    path: '/dashboard',
    component: Default,
    children: [
      { path: '', component: Dashboard, name: 'dashboard',
      meta: {
        needsAuth: true
      }
    }
    ],
  },
  // { // Always leave this as last one
  //   path: '*',
  //   component: () => import('pages/404')
  // }
]
