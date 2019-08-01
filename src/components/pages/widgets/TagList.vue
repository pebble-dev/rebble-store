<template>
  <div class="card subsection-inverse card-inverse text-center tags p-1">
    <router-link v-for="(tag, index) in tags" v-bind:key="index" v-bind:to="'category/' + tag.slug"><span class="badge badge-pill badge-pebble">{{tag.name}}</span></router-link>
  </div>
</template>

<script>

export default {
  name: 'tag-list',
  props: {
    tags: {}
  }
}
</script>

<style lang="scss" scoped>
</style>
