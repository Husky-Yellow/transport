import Vue from 'vue'
import Vuex from 'vuex'
import { login } from '@/api'

Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    token: '',
    phonenum: '',
    selectPeopleArr: [],
    selectDriver: {},
    timeManagement: {},
  },
  mutations:{
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_PHONENUM: (state, phonenum) => {
      state.phonenum = phonenum
    },
    CHANGE_SETTING: (state, { key, value }) => {
      if (state.hasOwnProperty(key)) {
        state[key] = value
      }
    }
  },
  actions:{
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
        uni.navigateTo({
          url: `/pages/login/index`,
        });
        resolve()
      })
    },

    changeSetting({ commit }, data) {
      commit('CHANGE_SETTING', data)
    }
  },
  getters: {
    token: state => state.token,
    phonenum: state => state.phonenum,
    selectPeopleArr: state => state.selectPeopleArr,
    selectDriver: state => state.selectDriver,
    timeManagement: state => state.timeManagement,
  }
})

export default store