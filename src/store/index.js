import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify'
import userParameters from './userParameters'
import config from './config'
import secure from './secure'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userParameters: userParameters,
    config: config,
    secure: secure
  },
  plugins: [pathify.plugin]
})
