<template>
  <div>
    <slider v-bind:banners="page.banners"></slider>
    <main class="home apps container">
      <tag-list v-if="type != 'faces' && page.categories !== undefined" v-bind:tags="page.categories"></tag-list>
      <card-collection v-for="(collection, index) in page.collections"  v-bind:key="index" v-bind:elTitle="collection.name" v-bind:cards="collection.data" v-bind:allUrl="`/${type}/${collection.slug}`"></card-collection>
    </main>
  </div>
</template>

<script>
import CardCollection from './pages/widgets/CardCollection'
import TagList from './pages/widgets/TagList'
import Slider from './pages/widgets/HomeSlider'

const MAX_HOME_COLLECTION_SIZE = 6

// mostRecentCards and freshPicksCards are placeholders. Todo: actually fetch those from the server.
export default {
  name: 'Home',
  components: {
    CardCollection,
    Slider,
    TagList
  },
  data: function () {
    return {
      page: {},
      type: ''
    }
  },
  watch: {
    '$route' (to, from) {
      this.get_data(to.params)
    }
  },
  methods: {
    get_data: function (routeParams) {
      var that = this
      this.type = routeParams.type
      this.setTitle(this.type === 'faces' || this.type === 'watchfaces' ? 'Watchfaces' : 'Apps')
      this.$http.get(`${this.$store.state.config.backendUrl}/home/${this.type}?platform=${this.$store.state.userParameters.platform}&hardware=${this.$store.state.userParameters.hardware}&filter_hardware=true`).then(response => {
        that.page = response.body
        this.build_collections()
      }, response => {
        console.error(response)
      })
    },
    build_collections: function () {
      for (let collection of this.page.collections) {
        collection.data = []
        for (let id of collection.application_ids) {
          if (collection.data.length >= MAX_HOME_COLLECTION_SIZE) {
            // Limit collection size
            break
          }
          collection.data.push(this.page.applications.find(function (app) {
            return id === app.id
          }))
        }
      }
    }
  },
  beforeMount: function () {
    this.get_data(this.$route.params)
  }
}
</script>

<style lang="scss">
main.home {
  @media screen and (min-width: 992px) {
    section .card-columns {
        column-count: 3 !important;
    }
  }
}

</style>
