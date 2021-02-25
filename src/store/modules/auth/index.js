import actions from '@/store/modules/auth/actions'
import getters from '@/store/modules/auth/getters'
import mutations from '@/store/modules/auth/mutations'

const authentication = {
  state: {
    userId: null,
    token: null,
    autoLogout: false
  },
  mutations,
  actions,
  getters
}

export default authentication