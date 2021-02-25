import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const coachesModule = {
  namespaced: true,
  state: {
    lastFetch: null,
    coaches: []
  },
  mutations,
  actions,
  getters
}

export default coachesModule