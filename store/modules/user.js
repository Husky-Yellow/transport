import { login } from '@/api'

const state = {
  token: '',
  phonenum: '',
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_PHONENUM: (state, phonenum) => {
    state.phonenum = phonenum
  },
}

const actions = {
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(async response => {
        const { ret } = response
        commit('SET_TOKEN', ret)
        commit('SET_PHONENUM', userInfo.phonenum)
        await uni.setStorageSync('token', ret)
        await uni.setStorageSync('phonenum', userInfo.phonenum)
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
      commit('SET_PHONENUM', '')
      uni.setStorageSync('token', '')
      uni.setStorageSync('phonenum', '')
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