<template>
  <div>
    <header>
        <div class="title-card">
            <h3>Collection: {{slug | capitalize}}</h3>
        </div>
    </header>
    <main class="apps container text-center">

        <card-collection :showTop="false" v-bind:cards="page.data" v-bind:urlArguments='urlArguments'></card-collection>

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
  name: 'collection',
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
      slug: '',
      sort: '',
      offsetPage: 1,
      pageLimit: 20,
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
      this.$http.get(this.backendUrl + '/apps/collection/' + this.slug + '/' + this.type + '?offset=' + offset + '&limit=' + this.pageLimit).then(response => {
        that.page = response.body
        console.log(that.page)
      }, response => {
        console.error(response)
      })
    },
    get_data: function (routeParams) {
      // Set url arguments if exist
      this.urlArguments = this.platform ? '?platform=' + this.platform : ''

      this.slug = routeParams.slug
      this.offsetPage = routeParams.page
      this.type = routeParams.type

      this.get_collection()
    },
    get_page_link: function (nextPage) {
      var thisPage = this.offsetPage
      if (nextPage) {
        thisPage++
      } else {
        thisPage--
      }
      return '/' + this.type + '/' + this.slug + '/' + thisPage
    }
  },
  beforeMount: function () {
    this.get_data(this.$route.params)
  }
}
</script>

<style lang="scss" scoped>
</style>
