import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const requestsModule = {
  namespaced: true,
  state: {
    requests: []
  },
  mutations,
  actions,
  getters
}

export default requestsModule