<template>
  <div>
    <main class="apps container text-xs-center">
      <section>
        <div class="header">
          <h6 class="text-xs-left"><div class="pebble">Fresh Picks</div></h6>
          <small><a class="text-xs-right" href="#/featured">See All ></a></small>
        </div>
        <div class="card-columns">
          <single-card v-for="n in 12"></single-card>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import SingleCard from './SingleCard'

export default {
  name: 'fresh-picks',
  components: {
    SingleCard
  }
}
</script>

<style lang="scss" scoped>
</style>
