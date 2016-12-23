<template>
  <div id="app">
    <div class="flex-content">
      <svg-container></svg-container>
      <navbar></navbar>
      <router-view></router-view>
    </div>
    <page-footer></page-footer>
  </div>
</template>

<script>
import SvgContainer from './components/SvgContainer'
import Home from './components/Home'
import Navbar from './components/Navbar'
import PageFooter from './components/PageFooter'

export default {
  name: 'app',
  components: {
    SvgContainer,
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
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
</style>
