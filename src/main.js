/* eslint-disable no-new */

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App'
import Home from './components/Home'
import AppList from './components/pages/AppList'
import Featured from './components/pages/Featured'
import Category from './components/pages/Category'
import AppView from './components/pages/AppView'
import AppDetails from './components/pages/AppDetails'
import AppVersions from './components/pages/AppVersions'
import Author from './components/pages/Author'
import Search from './components/pages/Search'
import Collection from './components/pages/Collection'
import Settings from './components/pages/Settings'
import Error from './components/pages/Error'

Vue.filter('formatDate', function (d) {
  var date = new Date(d)
  if (date) {
    return date.getFullYear() + '-' + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + (date.getDate() >= 10 ? date.getDate() : ('0' + date.getDate()))
  }
})

Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
  {path: '/', component: Home},
  {path: '/apps', component: AppList},
  {path: '/featured', component: Featured},
  {path: '/category', component: Category},
  {
    path: '/app/:id',
    component: AppView,
    children: [
      {
        path: '',
        component: AppDetails
      },
      {
        path: 'versions',
        component: AppVersions
      }
    ]
  },
  {path: '/author', component: Author},
  {path: '/search', component: Search},
  {path: '/collection/:id', component: Collection},
  {path: '/settings', component: Settings},
  {path: '*', component: Error}
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
