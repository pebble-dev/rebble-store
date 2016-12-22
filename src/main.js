/* eslint-disable no-new */
import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import Home from './components/Home'
import AppList from './components/pages/AppList'
import Featured from './components/pages/Featured'
import Category from './components/pages/Category'
import AppDetails from './components/pages/AppDetails'
import AppVersions from './components/pages/AppVersions'
import Author from './components/pages/Author'
import Search from './components/pages/Search'
import Error from './components/pages/Error'

Vue.use(VueRouter)

const routes = [
  {path: '/', component: Home},
  {path: '/apps', component: AppList},
  {path: '/featured', component: Featured},
  {path: '/category', component: Category},
  {path: '/app-details', component: AppDetails},
  {path: '/app-versions', component: AppVersions},
  {path: '/author', component: Author},
  {path: '/search', component: Search},
  {path: '/error', component: Error}
]

const router = new VueRouter({
  routes
  // mode: 'history'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
