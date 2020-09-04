<template>
  <div class="row tag-container">
    <div v-for="(tag, index) in tags" v-bind:key="index" class="col-6"><router-link v-bind:to="'category/' + tag.slug"  class="card text-white bg-dark text-center">{{tag.name}}</router-link></div>
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
.tag-container {
  max-width: 850px;
  margin-left: auto;
  margin-right: auto;
  .col-6 {
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 5px;
    a:hover {
      text-decoration: none;
    }
    .card {
      font-family: 'Open Sans', sans-serif;
      font-weight: 400;
      border: 0;
      padding: 6px;
      border-radius: 4px;
      box-shadow: 0 1px 1px 0 rgba(60,64,67,.08), 0 1px 3px 1px rgba(60,64,67,.16);
    }
  }
  margin-bottom: 30px;
}
</style>
