import Vue from 'vue'
import VueResource from 'vue-resource'

import App from './App'
import router from './router'

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

Vue.use(VueResource)

Vue.use(InstantSearch)
Vue.use(VueCookie)

Vue.component('card-collection', CardCollection)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
