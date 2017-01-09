<template>
  <div>
    <home-slider></home-slider>
    <main class="apps container">
      <div class="card subsection-inverse card-inverse text-center tags p-1">
        <a href="#/category"><span class="badge badge-pill badge-pebble">Daily</span></a>
        <a href="#/category"><span class="badge badge-pill badge-pebble">Tools & Utilities</span></a>
        <a href="#/category"><span class="badge badge-pill badge-pebble">Notifications</span></a>
        <a href="#/category"><span class="badge badge-pill badge-pebble">Remotes</span></a>
        <a href="#/category"><span class="badge badge-pill badge-pebble">Health & Fitness</span></a>
        <a href="#/category"><span class="badge badge-pill badge-pebble">Games</span></a>
        <a href="#/category"><span class="badge badge-pill badge-pebble">Daily</span></a>
        <a href="#/category"><span class="badge badge-pill badge-pebble">Tools & Utilities</span></a>
        <a href="#/category"><span class="badge badge-pill badge-pebble">Notifications</span></a>
        <a href="#/category"><span class="badge badge-pill badge-pebble">Remotes</span></a>
      </div>
      <card-collection elTitle="Most Recent"></card-collection>
      <card-collection elTitle="Fresh Picks"></card-collection>
    </main>
  </div>
</template>

<script>
import CardCollection from './widgets/CardCollection'
import HomeSlider from '../HomeSlider'

export default {
  name: 'app-list',
  components: {
    CardCollection,
    HomeSlider
  }
}
</script>

<style lang="scss" scoped>
</style>
