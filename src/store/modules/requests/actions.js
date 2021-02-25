export default {
  async contactCoach(context, payload) {
    const requestData = {
      userEmail: payload.userEmail,
      userMessage: payload.userMessage
    }
    const response = await fetch(`https://coach-finder-fa10f-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(requestData)
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to send request!')
    }
    context.commit('addRequest', payload)
  },

  async loadRequests(context) {
    const coachId = context.rootGetters.userId
    const token = context.rootGetters.token
    const response = await fetch(`https://coach-finder-fa10f-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=` + token)
    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to load requests!')
    }

    const requests = []

    for (const key in responseData) {
      const request = {
        id: key,
        userEmail: responseData[key].userEmail,
        userMessage: responseData[key].userMessage
     }
      requests.push(request)
    }

    context.commit('loadRequests', requests)
  }
}