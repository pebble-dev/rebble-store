import { make } from 'vuex-pathify'

const state = {
  accessToken: null
}

export default {
  namespaced: true,
  state: state,
  mutations: make.mutations(state)
}
