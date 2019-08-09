import { make } from 'vuex-pathify'
import { version } from '../../package.json'

const state = {
  version: '',
  platform: 'all', // either 'android', 'ios', or 'all'
  hardware: 'basalt',
  appVersion: '',
  inApp: false,
  devMode: false
}

export default {
  namespaced: true,
  state: state,
  mutations: {
    ...make.mutations(state),
    INIT (state) {
      if (localStorage.getItem('rebbleUserParameters')) {
        let cacheState = JSON.parse(localStorage.getItem('rebbleUserParameters'))
        if (cacheState.version === version) {
          Object.assign(state, cacheState)
        } else {
          state.version = version
        }
      } else {
        state.version = version
      }
    }
  }
}
