<template>
  <div>
    <header class="main">
        <div class="title-card">
            <h3>Collection: {{slug | capitalize}}</h3>
        </div>
    </header>
    <main class="apps container text-center">

        <card-collection :showTop="false" v-bind:cards="page.data"></card-collection>

        <pagination v-bind:links="page.links" v-bind:baseUrl="`/${this.type}/${this.slug}`"></pagination>
    </main>
    </div>
</template>

<script>
import CardCollection from './widgets/CardCollection'
import Pagination from './widgets/Pagination'

export default {
  name: 'collection',
  components: {
    CardCollection,
    Pagination
  },
  data: function () {
    return {
      page: {},
      slug: '',
      sort: '',
      offsetPage: 1,
      pageLimit: 24,
      type: ''
    }
  },
  watch: {
    '$route' (to, from) {
      this.get_data(to.params)
    }
  },
  methods: {
    get_collection: function () {
      var that = this
      var offset = this.pageLimit * (this.offsetPage - 1)
      this.$http.get(`${this.buildResourceUrl(`apps/collection/${this.slug}/${this.type}`)}&offset=${offset}&limit=${this.pageLimit}`).then(response => {
        that.page = response.body
      }, response => {
        console.error(response)
      })
    },
    get_data: function (routeParams) {
      this.slug = routeParams.slug
      this.offsetPage = routeParams.page
      this.type = routeParams.type

      this.get_collection()
    }
  },
  beforeMount: function () {
    this.get_data(this.$route.params)
  }
}
</script>

<style lang="scss" scoped>
</style>
