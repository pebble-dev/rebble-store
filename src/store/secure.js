import VueCookie from 'vue-cookie'
import { make } from 'vuex-pathify'

const state = {
  accessToken: null
}

export default {
  namespaced: true,
  state: state,
  mutations: {
    ...make.mutations(state),
    INIT (state) {
      if (VueCookie.get('access_token')) {
        state.accessToken = VueCookie.get('access_token')
      }
    }
  }
}
