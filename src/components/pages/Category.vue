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

        <nav>
          <ul class="pagination">
            <li v-bind:class="offsetPage > 1 ? 'page-item': 'page-item disabled'">
              <router-link class="page-link" v-bind:to="get_page_link(false)" tabindex="-1" aria-label="Previous">
                <span aria-hidden="true"><i class="fa fa-angle-left" aria-hidden="true"></i></span> Previous
                <span class="sr-only">Previous</span>
              </router-link>
            </li>
            <li class="page-item" v-bind:class="page.links.nextPage != null ? 'page-item': 'page-item disabled'">
              <router-link class="page-link" v-bind:to="get_page_link(true)" aria-label="Next">
                Next <span aria-hidden="true"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
                <span class="sr-only">Next</span>
              </router-link>
            </li>
          </ul>
        </nav>
    </main>
    </div>
</template>

<script>
import CardCollection from './widgets/CardCollection'

export default {
  name: 'category',
  components: {
    CardCollection
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
      this.$http.get(this.$store.state.backendUrl + '/apps/category/' + this.id + '?sort=' + this.sort + '&limit=' + this.pageLimit + '&offset=' + offset).then(response => {
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
    },
    get_page_link: function (nextPage) {
      var thisPage = this.offsetPage
      if (nextPage) {
        thisPage++
      } else {
        thisPage--
      }
      return '/category/' + this.id + '/' + this.sort + '/' + thisPage
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
