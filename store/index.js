import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import selectPeople from './modules/selectPeople'

Vue.use(Vuex)
//创建vuex实例
const store = new Vuex.Store({
  modules: {
    user,
    selectPeople
  },
  getters
})

export default store