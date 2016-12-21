<template>
  <div>
    <main class="apps container text-xs-center">
      <section>
        <div class="header">
          <h6 class="text-xs-left"><div class="pebble">Fresh Picks</div></h6>
          <small><a class="text-xs-right" href="#/featured">See All ></a></small>
        </div>
        <div class="card-columns">

          <app-single_cards v-for="n in 12">></app-single_cards>

        </div>

      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'fresh-picks',
}
</script>

<style lang="scss" scoped>
</style>
