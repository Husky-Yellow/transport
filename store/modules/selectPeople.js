const state = {
  selectPeopleArr: '',
}

const mutations = {
  SET_SELECTPEOPLEARR: (state, selectPeopleArr) => {
    state.selectPeopleArr = selectPeopleArr
  },
}

const actions = {
  selectPeople({ commit }, arr) {
    return new Promise((resolve, reject) => {
      commit('SET_SELECTPEOPLEARR', arr)
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