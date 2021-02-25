import {defineAsyncComponent} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import CoachesList from './pages/coaches/CoachesList'
import NotFound from './pages/NotFound'
import TheAuthorization from '@/pages/auth/TheAuthentication'
import store from './store/index'

const CoachesDetails = defineAsyncComponent(() => import('./pages/coaches/CoachesDetails'))
const ContactCoach = defineAsyncComponent(() => import('./pages/requests/ContactCoach'))
const CoachRegister = defineAsyncComponent(() => import('./pages/coaches/CoachRegister'))
const RequestsReceived = defineAsyncComponent(() => import('./pages/requests/RequestsReceived'))

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', redirect: '/coaches'},
    {path: '/coaches', component: CoachesList},
    {
      props: true,
      path: '/coaches/:id', component: CoachesDetails,
      children: [{path: 'contact', component: ContactCoach}]
    },
    {path: '/register', component: CoachRegister, meta: {mustBeAuthorized: true}},
    {path: '/requests', component: RequestsReceived, meta: {mustBeAuthorized: true}},
    {path: '/auth', component: TheAuthorization, meta: {mustBeUnauthorized: true}},
    {path: '/:NotFound(.*)', component: NotFound}
  ]
})

router.beforeEach((to, _, next) => {
  if (to.meta.mustBeAuthorized && !store.getters.isAuthenticated) {
    next('/auth')
  }
  else if (to.meta.mustBeUnauthorized && store.getters.isAuthenticated) {
    next('/coaches')
  } else {
    next()
  }
})

export default router