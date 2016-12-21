import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import Home from './router-home.vue'
import appDetails from './router-app_details.vue'
import appVersion from './router-app_version.vue'
import Author from './router-author.vue'
import Featured from './router-featured.vue'
import Search from './router-search.vue'
import Category from './router-category.vue'
import Apps from './router-apps.vue'
import Error from './router-error.vue'

import Freshpicks from './freshpicks.vue'
import homeSlider from './home-slider.vue'
import SingleCards from './single-cards.vue'

Vue.use(VueRouter)

const routes = [
    {path: '/', component: Home},
    {path: '/featured', component: Featured},
    {path: '/app-details', component: appDetails},
    {path: '/app-version', component: appVersion},
    {path: '/author', component: Author},
    {path: '/search', component: Search},
    {path: '/category', component: Category},
    {path: '/apps', component: Apps},
    {path: '/error', component: Error},
]

const router = new VueRouter({
    routes,
    // mode: 'history'
})

Vue.component('app-freshpicks', Freshpicks)
Vue.component('app-single_cards', SingleCards)
Vue.component('app-home-slider', homeSlider)

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
