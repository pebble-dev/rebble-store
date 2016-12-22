<template>
  <div>
    <app-home-slider></app-home-slider>
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
      <fresh-picks></fresh-picks>
    </main>
  </div>
</template>

<script>
import FreshPicks from './widgets/FreshPicks'

export default {
  name: 'app-list',
  components: {
    FreshPicks
  }
}
</script>

<style lang="scss" scoped>
</style>
