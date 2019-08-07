import Vue from 'vue'
import Vuex from 'vuex'
import pathify, { make } from 'vuex-pathify'
import { version } from '../../package.json'

Vue.use(Vuex)

const userParametersState = {
  version: '',
  platform: 'all', // either 'android', 'ios', or 'all'
  hardware: 'basalt',
  firmwareVersion: '',
  appVersion: '',
  inApp: false,
  devMode: false,
  accessToken: null
}

const configState = {
  backendUrl: 'https://appstore-api.rebble.io/api/v1',
  devPortalBackendUrl: 'https://appstore-api.rebble.io/api/v0',
  tosLink: 'https://rebble.io/tos/',
  contactLink: ''
}

const userParametersMutations = {
  ...make.mutations(userParametersState),
  INIT (state) {
    if (localStorage.getItem('rebbleStoreData')) {
      let cacheStore = JSON.parse(localStorage.getItem('rebbleStoreData'))
      if (cacheStore.version === version) {
        this.replaceState(
          Object.assign(state, cacheStore)
        )
      } else {
        state.version = version
      }
    }
  }}
console.log(userParametersMutations)

export default new Vuex.Store({
  modules: {
    userParameters: {
      namespaced: true,
      state: userParametersState,
      mutations: userParametersMutations
    },
    config: {
      namespaced: true,
      state: configState
    }
  },
  plugins: [pathify.plugin]
})
