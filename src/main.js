import Vue from 'vue'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App'
import router from './router'
import store from './store'
import mixin from './mixin'

import InstantSearch from 'vue-instantsearch'
import VueCookie from 'vue-cookie'

import CardCollection from './components/pages/widgets/CardCollection'

Vue.filter('formatDate', function (d) {
  let date = new Date(d)
  if (date) {
    return date.getFullYear() + '-' + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + (date.getDate() >= 10 ? date.getDate() : ('0' + date.getDate()))
  }
})

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('readable-name', function (value) {
  if (!value) return ''
  value = value.toString()
  return value[0].toUpperCase() + value.replace(new RegExp('-', 'g'), ' ').substring(1)
})

Vue.mixin({
  methods: {
    buildResourceUrl: mixin.buildResourceUrl,
    setTitle: mixin.setTitle,
    openExternal: mixin.openExternal
  }
})

Vue.use(VueResource)
Vue.use(BootstrapVue)

Vue.use(InstantSearch)
Vue.use(VueCookie)

Vue.component('card-collection', CardCollection)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
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
  },
  render: h => h(App)
})
