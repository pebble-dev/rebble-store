<template>
  <div>
    <home-slider></home-slider>
    <main class="apps container text-xs-center">
      <div class="card subsection-inverse card-inverse text-xs-center p-1">
        <a href="#/category"><span class="tag tag-pill tag-pebble">Daily</span></a>
        <a href="#/category"><span class="tag tag-pill tag-pebble">Tools & Utilities</span></a>
        <a href="#/category"><span class="tag tag-pill tag-pebble">Notifications</span></a>
        <a href="#/category"><span class="tag tag-pill tag-pebble">Remotes</span></a>
        <a href="#/category"><span class="tag tag-pill tag-pebble">Health & Fitness</span></a>
        <a href="#/category"><span class="tag tag-pill tag-pebble">Games</span></a>
        <a href="#/category"><span class="tag tag-pill tag-pebble">Daily</span></a>
        <a href="#/category"><span class="tag tag-pill tag-pebble">Tools & Utilities</span></a>
        <a href="#/category"><span class="tag tag-pill tag-pebble">Notifications</span></a>
        <a href="#/category"><span class="tag tag-pill tag-pebble">Remotes</span></a>
      </div>
      <card-collection elTitle="Most Recent"></card-collection>
      <card-collection elTitle="Fresh Picks"></card-collection>
    </main>
  </div>
</template>

<script>
import CardCollection from './widgets/CardCollection'

export default {
  name: 'app-list',
  components: {
    CardCollection
  }
}
</script>

<style lang="scss" scoped>
</style>
