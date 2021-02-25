export default {
  async addNewCoach(context, data) {
    const userId = context.rootGetters.userId
    const token = context.rootGetters.token

    const response = await fetch(`https://coach-finder-fa10f-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=` + token, {
      method: 'PUT',
      body: JSON.stringify(data)
    })

    const responseData = await response.json()

    if (!response.ok) {
      console.log(responseData)
      throw new Error(responseData.message || 'Failed to send data!')
    }

    context.commit('registerNewCoach', {
      id: context.rootGetters.userId,
      ...data
    })
  },

  async loadCoaches(context, payload) {
    if (!payload && !context.getters.shouldFetch) {
      return
    }

    const response = await fetch('https://coach-finder-fa10f-default-rtdb.europe-west1.firebasedatabase.app/coaches.json')

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch data!')
    }

    const coaches = []
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        areas: responseData[key].areas,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate
      }
      coaches.push(coach)
    }
    context.commit('loadCoaches', coaches)
    context.commit('updateLastFetch')
  },

  setToCoach(context) {
    context.commit('setToCoach')
  }
}