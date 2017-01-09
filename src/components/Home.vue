<template>
  <div>
    <home-slider></home-slider>
    <main class="apps container text-center">
      <card-collection elTitle="Most Recent"></card-collection>
      <card-collection elTitle="Fresh Picks"></card-collection>
    </main>
  </div>
</template>

<script>
import CardCollection from './pages/widgets/CardCollection'
import HomeSlider from './HomeSlider'

export default {
  name: 'Home',
  components: {
    CardCollection,
    HomeSlider
  }
}
</script>

<style lang="scss" scoped>
</style>
