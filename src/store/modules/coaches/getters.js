export default {
  coaches(state) {
    return state.coaches
  },
  doHaveCoaches(state) {
    return state.coaches && state.coaches > 0
  },
  shouldFetch(state) {
    if (!state.lastFetch) {
      return true
    }
    const currentTime = new Date().getTime()
    return (currentTime - state.lastFetch) / 1000 > 60
  },
  isCoach(_, getters, __2, rootGetters) {
    const userId = rootGetters.userId
    const coaches = getters.coaches
    return coaches.some(coach => coach.id === userId)
  }
}