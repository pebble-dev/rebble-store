<template>
  <div>
    <home-slider></home-slider>
    <main class="apps container text-xs-center">
      <fresh-picks></fresh-picks>
    </main>
  </div>
</template>

<script>
import FreshPicks from './pages/widgets/FreshPicks'
import HomeSlider from './HomeSlider'

export default {
  name: 'Home',
  components: {
    FreshPicks,
    HomeSlider
  }
}
</script>

<style lang="scss" scoped>
</style>
