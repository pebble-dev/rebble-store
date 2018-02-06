import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AppList from '@/components/pages/AppList'
import Featured from '@/components/pages/Featured'
import Category from '@/components/pages/Category'
import AppView from '@/components/pages/AppView'
import AppDetails from '@/components/pages/AppDetails'
import AppVersions from '@/components/pages/AppVersions'
import Author from '@/components/pages/Author'
import Search from '@/components/pages/Search'
import Collection from '@/components/pages/Collection'
import Settings from '@/components/pages/Settings'
import Account from '@/components/pages/Account'
import AccountLogin from '@/components/pages/AccountLogin'
import AccountDisconnect from '@/components/pages/AccountDisconnect'
import Error from '@/components/pages/Error'

Vue.use(Router)

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
  {path: '/author/:id', component: Author},
  {path: '/search', component: Search},
  {path: '/collection/:id', component: Collection},
  {path: '/settings', component: Settings},
  {path: '/user/account', component: Account},
  {path: '/user/login', component: AccountLogin},
  {path: '/user/disconnect', component: AccountDisconnect},
  {path: '*', component: Error}
]

export default new Router({
  routes: routes,
  mode: 'history'
})
