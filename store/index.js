import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'

Vue.use(Vuex)
//创建vuex实例
const store = new Vuex.Store({
  modules: {
    user
  },
  getters
})

export default store