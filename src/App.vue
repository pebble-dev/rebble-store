<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
    <page-footer></page-footer>
  </div>
</template>

<script>
import Home from './components/Home'
import Navbar from './components/Navbar'
import PageFooter from './components/PageFooter'

export default {
  name: 'app',
  components: {
    Navbar,
    Home,
    PageFooter
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
