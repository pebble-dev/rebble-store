<template>
  <div>
    <main class="apps container text-xs-center">
      <section>
        <div class="header" v-if="showTop">
          <h6 class="text-xs-left">
            <div class="pebble">{{ elTitle }}</div>
          </h6>
          <small><a class="text-xs-right" href="#/featured">See All ></a></small>
        </div>
        <div class="card-columns">
          <single-card v-for="n in 8"></single-card>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import SingleCard from './SingleCard'

export default {
  name: 'card-collection',
  props: {
    elTitle: {
      type: String,
      default: 'Collection Title'
    },
    showTop: {
      type: Boolean,
      default: true
    }
  },
  components: {
    SingleCard
  }
}
</script>

<style lang="scss" scoped>
</style>
