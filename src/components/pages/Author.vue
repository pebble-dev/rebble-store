<template>
  <div>
    <header class="main">
      <div v-if="page.data !== undefined" class="title-card">
        <h3>Apps by: {{ page.data[0].author }}</h3>
      </div>
    </header>
    <main class="apps container text-center">
      <card-collection :showTop="false" v-bind:cards="page.data"></card-collection>

      <pagination v-bind:links="page.links" v-bind:baseUrl="`/author/${this.$route.params.id}`"></pagination>
    </main>
  </div>
</template>

<script>
import CardCollection from './widgets/CardCollection'
import Pagination from './widgets/Pagination'

export default {
  name: 'author',
  components: {
    CardCollection,
    Pagination
  },
  data: function () {
    return {
      page: {},
      pageLimit: 6
    }
  },
  watch: {
    '$route' (to, from) {
      this.get_data()
    }
  },
  methods: {
    get_author: function (id, offsetPage) {
      var offset = this.pageLimit * (offsetPage - 1)
      this.$http.get(`${this.buildResourceUrl(`apps/dev/${id}`)}&offset=${offset}&limit=${this.pageLimit}`).then(response => {
        this.page = response.body
        this.setTitle(this.page.data[0].author)
      }, response => {
        console.error(response)
      })
    },
    get_data: function () {
      this.get_author(this.$route.params.id, this.$route.params.page)
    }
  },
  beforeMount: function () {
    this.get_data()
  }
}
</script>

<style lang="scss" scoped>
</style>
