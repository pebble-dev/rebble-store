import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    backendUrl: 'https://appstore-api.rebble.io/api/v1',
    devPortalBackendUrl: 'https://appstore-api.rebble.io/api/v0',
    inApp: false,
    devMode: false,
    storeParameters: {
      platform: 'all', // either 'android', 'ios', or 'all'
      hardware: 'basalt',
      accessToken: null
    }
  }
})
