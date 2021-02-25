import {createStore} from 'vuex'
import coachesModule from './modules/coaches/index'
import requestsModule from './modules/requests/index'
import authentication from './modules/auth/index'

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
    auth: authentication
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters: {

  }
})

export default store