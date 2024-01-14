import { reqGetPassCode, reqUserRegister, reqUserLogin, reqGetUserInfo, reqLogOut } from '@/api'

const state = {
  passcode: '',
  token: localStorage.getItem('TOKEN'),
  userInfo: {},
}

const actions = {
  async getPasscode(context, phoneNo) {
    let result = await reqGetPassCode(phoneNo)
    if (result.code == 200) {
      context.commit('PASSCODE', result.data)
    }
  },

  async registerUser(context, user) {
    let result = await reqUserRegister(user)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('Failed'))
    }
  },

  async userLogin(context, data) {
    let result = await reqUserLogin(data)
    if (result.code == 200) {
      context.commit('LOGIN', result.data.token)
      localStorage.setItem('TOKEN', result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('Failed'))
    }
  },

  async getUserInfo(context) {
    let result = await reqGetUserInfo()
    if (result.code == 200) {
      context.commit('USERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('Failed'))
    }
  },

  async userLogout(context) {
    let result = await reqLogOut()
    if (result.code == 200) {
      context.commit('LOGOUT')
      return 'ok'
    } else {
      return Promise.reject(new Error('Failed'))
    }
  },
}

const mutations = {
  PASSCODE(state, data) {
    state.passcode = data
  },
  LOGIN(state, token) {
    state.token = token
  },
  USERINFO(state, data) {
    state.userInfo = data
  },
  LOGOUT(state) {
    state.token = ''
    state.userInfo = {}
    localStorage.removeItem('TOKEN')
  },
}

const getters = {}

export default {
  actions,
  mutations,
  state,
  getters,
}
