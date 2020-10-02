import { createApp } from 'vue'
// import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App'
import router from './router'
import store from './store'
import mixin from './mixin'
import axios from 'axios'

// import InstantSearch from 'vue-instantsearch'
// import VueCookie from 'vue-cookie'

import CardCollection from './components/pages/widgets/CardCollection'

const app = createApp(App, {
  beforeCreate () {
    this.$store.commit('userParameters/INIT', null, { root: true })
    this.$store.commit('secure/INIT', null, { root: true })
    store.subscribe((mutation, state) => {
      if (mutation.type.substr(0, 15) === 'userParameters/') {
        // Only save user parameters when needed
        localStorage.setItem('rebbleUserParameters', JSON.stringify(state.userParameters))
      }
      if (mutation.type.substr(0, 23) === 'secure/SET_ACCESS_TOKEN') {
        // Only save user parameters when needed
        this.$cookie.set('access_token', state.secure.accessToken)
      }
    })
  }
})
  .use(store)
  .use(router)
  .mixin({
    methods: {
      buildResourceUrl: mixin.buildResourceUrl,
      setTitle: mixin.setTitle,
      openExternal: mixin.openExternal,
      formatDate: mixin.formatDate,
      capitalize: mixin.capitalize,
      readable_name: mixin.readable_name
    }
  })
//  .use(BootstrapVue)
//  .use(InstantSearch)
//   .use(VueCookie)
  .component('card-collection', CardCollection)
app.config.globalProperties.$http = axios
app.mount('#app')
