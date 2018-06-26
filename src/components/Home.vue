<template>
  <div>
    <slider v-bind:banners="page.banners"></slider>
    <main class="apps container">
      <tag-list v-if="type != 'faces'" v-bind:tags="page.categories"></tag-list>
      <card-collection v-for="(collection, index) in page.collections"  v-bind:key="index" v-bind:elTitle="collection.name" v-bind:cards="collection.data" v-bind:urlArguments="urlArguments" v-bind:allUrl="'/' + type + '/' + collection.slug"></card-collection>
    </main>
  </div>
</template>

<script>
import CardCollection from './pages/widgets/CardCollection'
import TagList from './pages/widgets/TagList'
import Slider from './Slider'

// mostRecentCards and freshPicksCards are placeholders. Todo: actually fetch those from the server.
export default {
  name: 'Home',
  components: {
    CardCollection,
    Slider,
    TagList
  },
  props: {
    backendUrl: '',
    platform: ''
  },
  data: function () {
    return {
      urlArguments: '',
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
      this.$http.get(this.backendUrl + '/home/' + this.type).then(response => {
        that.page = response.body
        this.build_collections()
        console.log(that.page)
      }, response => {
        console.error(response)
      })
    },
    build_collections: function () {
      for (let collection of this.page.collections) {
        collection.data = []
        for (let id of collection.application_ids) {
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

<style lang="scss" scoped>
</style>
