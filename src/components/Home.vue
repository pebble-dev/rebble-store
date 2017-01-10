<template>
  <div>
    <slider></slider>
    <main class="apps container text-center">
      <card-collection elTitle="Most Recent"></card-collection>
      <card-collection elTitle="Fresh Picks"></card-collection>
    </main>
  </div>
</template>

<script>
import CardCollection from './pages/widgets/CardCollection'
import Slider from './Slider'

export default {
  name: 'Home',
  components: {
    CardCollection,
    Slider
  }
}
</script>

<style lang="scss" scoped>
</style>
