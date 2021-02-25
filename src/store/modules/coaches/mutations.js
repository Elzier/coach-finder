export default {
  registerNewCoach(state, data) {
    state.coaches.push(data)
  },
  loadCoaches(state, data) {
    state.coaches = data
  },
  updateLastFetch(state) {
    state.lastFetch = new Date().getTime()
  }}