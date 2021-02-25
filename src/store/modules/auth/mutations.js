export default {
  setUser(state, payload) {
    state.userId = payload.userId
    state.token = payload.token
    state.autoLogout = false
  },
  setAutologOut(state) {
    state.autoLogout = true
  }
}