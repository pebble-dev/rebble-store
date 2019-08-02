<template>
  <div>
    <header>
        <div class="title-card">
            <h3>{{id | capitalize}}</h3>
        </div>
    </header>
    <main class="apps container text-center">
        <div class="text-center header-tool">
          <div class="btn-group btn-group-sm" role="group">
            <router-link v-bind:to="'/category/' + id + '/hearts/1'" v-bind:class="sort == 'hearts' ? 'btn btn-outline-secondary active': 'btn btn-outline-secondary'" role="button">Most Liked</router-link>
            <router-link v-bind:to="'/category/' + id + '/updated/1'" v-bind:class="sort == 'updated' ? 'btn btn-outline-secondary active': 'btn btn-outline-secondary'" role="button">Recently Added</router-link>
          </div>
        </div>

        <card-collection :showTop="false" v-bind:cards="page.data"></card-collection>
        <pagination v-bind:links="page.links" v-bind:baseUrl="`/category/${this.id}/${this.sort}`"></pagination>
    </main>
    </div>
</template>

<script>
import CardCollection from './widgets/CardCollection'
import Pagination from './widgets/Pagination'

export default {
  name: 'category',
  components: {
    CardCollection,
    Pagination
  },
  data: function () {
    return {
      page: {},
      id: '',
      sort: '',
      offsetPage: 1,
      pageLimit: 24
    }
  },
  watch: {
    '$route' (to, from) {
      this.get_data(to.params)
    }
  },
  methods: {
    get_category: function () {
      var that = this
      var offset = this.pageLimit * (this.offsetPage - 1)
      this.$http.get(`${this.buildResourceUrl(`apps/category/${this.id}`)}&sort=${this.sort}&offset=${offset}&limit=${this.pageLimit}`).then(response => {
        that.page = response.body
      }, response => {
        console.error(response)
      })
    },
    get_data: function (routeParams) {
      this.id = routeParams.id
      this.sort = routeParams.sort
      this.offsetPage = routeParams.page

      this.get_category()
    }
  },
  beforeMount: function () {
    this.get_data(this.$route.params)
  }
}
</script>

<style lang="scss" scoped>
.header-tool {
  margin-bottom: 40px;
}
</style>
