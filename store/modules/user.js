import { login } from '@/api'

const state = {
  token: '',
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
}

const actions = {
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(async response => {
        const { ret } = response
        commit('SET_TOKEN', ret)
        await uni.setStorageSync('token', ret)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      uni.setStorageSync('token', '')
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}