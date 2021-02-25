export default {
  getRequests(state) {
    return state.requests
    // const userId = rootGetters.userId
    // return state.requests.filter(req => req.userId === userId)
  },
  doRequestExists(_, getters) {
    return getters.getRequests && getters.getRequests.length > 0
  }
}