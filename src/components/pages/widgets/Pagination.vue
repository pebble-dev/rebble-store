<template>
  <nav v-if="links != undefined">
    <ul class="pagination">
      <li v-bind:class="this.$route.params.page > 1 ? 'page-item': 'page-item disabled'">
        <router-link class="page-link" v-bind:to="`${baseUrl}/${+(this.$route.params.page) - 1}`" tabindex="-1" aria-label="Previous">
          <span aria-hidden="true"><i class="fa fa-angle-left" aria-hidden="true"></i></span> Previous
          <span class="sr-only">Previous</span>
        </router-link>
      </li>
      <li class="page-item" v-bind:class="links.nextPage != null ? 'page-item': 'page-item disabled'">
        <router-link class="page-link" v-bind:to="`${baseUrl}/${+(this.$route.params.page) + 1}`" aria-label="Next">
          Next <span aria-hidden="true"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
          <span class="sr-only">Next</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'pagination',
  components: {
  },
  props: {
    links: {
      default: undefined
    },
    baseUrl: {
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
