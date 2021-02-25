let timer

export default {
  async signUp(context, payload) {
     return context.dispatch('auth', {
      ...payload,
      mode: 'signUp'
    })
  },
  async logIn(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'logIn'
    })
  },
  async auth(context, payload) {
    const mode = payload.mode
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDzfaxv5usm38RcD6G-FxW4sgWqv_QfKsE'

    if (mode === 'signUp') {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDzfaxv5usm38RcD6G-FxW4sgWqv_QfKsE'
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    })
    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to authenticate. Check your login data.')
    }

    const tokenExpiration = responseData.expiresIn * 1000
    const expireDate = new Date().getTime() + tokenExpiration 

    const userId = responseData.localId
    const token = responseData.idToken
    localStorage.setItem('userId', userId)
    localStorage.setItem('token', token)
    localStorage.setItem('expiration', expireDate)

    timer = setTimeout(() => {
      context.dispatch('autoLogOut')
    } ,tokenExpiration)

    context.commit('setUser', {
      userId: userId,
      token: token
    })
  },

  tryLogin(context) {
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    const tokenExpiration = localStorage.getItem('expiration')
    const expiresIn = tokenExpiration - new Date().getTime()

    if (expiresIn < 10000) {
      return
    }

    context.commit('setUser', {
      userId: userId,
      token: token
    })
  },

  logOut(context) {
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')

    clearTimeout(timer)

    context.commit('setUser', {
      userId: null,
      token: null,
      tokenExpiration: null
    })
  },

  autoLogOut(context) {
    context.dispatch('logOut')
    context.commit('setAutologOut')
  }
}