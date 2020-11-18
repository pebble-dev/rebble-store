import { createStore } from 'vuex'
import pathify from 'vuex-pathify'
import userParameters from './userParameters'
import config from './config'
import secure from './secure'

export default createStore({
  modules: {
    userParameters: userParameters,
    config: config,
    secure: secure
  },
  plugins: [pathify.plugin]
})
