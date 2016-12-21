<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Hello'
import FreshPicks from './components/FreshPicks'
import HomeSlider from './components/HomeSlider'
import SingleCard from './components/SingleCard'

import RouterHome from './components/router/RouterHome'
import RouterAppDetails from './components/router/RouterAppDetails'
import RouterSearch from './components/router/RouterSearch'
import RouterAppVersion from './components/router/RouterAppVersion'
import RouterApps from './components/router/RouterApps'
import RouterError from './components/router/RouterError'
import RouterAuthor from './components/router/RouterAuthor'
import RouterFeatured from './components/router/RouterFeatured'
import RouterCategory from './components/router/RouterCategory'

export default {
  name: 'app',
  components: {
    Hello,
    FreshPicks,
    HomeSlider,
    SingleCard,
    RouterAppDetails,
    RouterHome,
    RouterSearch,
    RouterAppVersion,
    RouterApps,
    RouterError,
    RouterAuthor,
    RouterFeatured,
    RouterCategory
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
