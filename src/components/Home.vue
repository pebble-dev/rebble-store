<template>
  <div>
    <home-slider></home-slider>
    <main class="apps container text-xs-center">
      <fresh-picks></fresh-picks>
    </main>
    <page-footer></page-footer>
  </div>
</template>

<script>
import FreshPicks from './FreshPicks'
import HomeSlider from './HomeSlider'
import PageFooter from './PageFooter'

import RouterHome from './router/RouterHome'
import RouterAppDetails from './router/RouterAppDetails'
import RouterSearch from './router/RouterSearch'
import RouterAppVersion from './router/RouterAppVersion'
import RouterApps from './router/RouterApps'
import RouterError from './router/RouterError'
import RouterAuthor from './router/RouterAuthor'
import RouterFeatured from './router/RouterFeatured'
import RouterCategory from './router/RouterCategory'

export default {
  name: 'Home',
  components: {
    FreshPicks,
    HomeSlider,
    PageFooter,
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

<style lang="scss" scoped>
</style>
