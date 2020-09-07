import { make } from 'vuex-pathify'
import { version } from '../../package.json'

export const platformEnum = {
  all: 'all',
  ios: 'ios',
  android: 'android'
}

export const hardwareEnum = {
  all: 'all',
  aplite: 'aplite', // OG Pebble and Pebble Steel
  basalt: 'basalt', // Pebble Time and Pebble Time Steel
  chalk: 'chalk', // Pebble Round
  diorite: 'diorite', // Pebble 2
  emery: 'emery' // Pebble Time 2
}

const state = {
  version: '',
  platform: platformEnum.all, // either 'android', 'ios', or 'all'
  hardware: hardwareEnum.all,
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
