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
            <router-link v-bind:to="'/category/' + id + '/hearts/' + offsetPage" v-bind:class="sort == 'hearts' ? 'btn btn-outline-secondary active': 'btn btn-outline-secondary'" role="button">Most Liked</router-link>
            <router-link v-bind:to="'/category/' + id + '/updated/' + offsetPage" v-bind:class="sort == 'updated' ? 'btn btn-outline-secondary active': 'btn btn-outline-secondary'" role="button">Recently Added</router-link>
          </div>
        </div>

        <card-collection :showTop="false" v-bind:cards="page.data" v-bind:urlArguments='urlArguments'></card-collection>

        <nav>
          <ul class="pagination">
            <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1" aria-label="Previous">
                <span aria-hidden="true"><i class="fa fa-angle-left" aria-hidden="true"></i></span> Previous
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                Next <span aria-hidden="true"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
                <span class="sr-only">Next</span>
              </a>
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
  props: {
    backendUrl: '',
    platform: ''
  },
  data: function () {
    return {
      'urlArguments': '',
      page: {},
      id: '',
      sort: '',
      offsetPage: 1,
      pageLimit: 20
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
      this.$http.get(this.backendUrl + '/apps/category/' + this.id + '?sort=' + this.sort + '&limit=' + this.pageLimit + '&offset=' + offset).then(response => {
        that.page = response.body
        console.log(that.page)
      }, response => {
        console.error(response)
      })
    },
    get_data: function (routeParams) {
      // Set url arguments if exist
      this.urlArguments = this.platform ? '?platform=' + this.platform : ''

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
