<template>
  <div>
    <header>
      <div class="title-card">
        <h3>Collection: {{ collection.name }}</h3>
      </div>
    </header>
    <main class="apps container text-center">
      <div class="btn-group" role="group">
        <a v-bind:class="{ active: sort == 'new'}" v-on:click="sort = 'new'" class="btn btn-outline-secondary" role="button">
          Sort by New
        </a>

        <a v-bind:class="{ active: sort == 'popular'}" v-on:click="sort = 'popular'" class="btn btn-outline-secondary" role="button">
          Sort by Popular
        </a>
      </div>

      <card-collection :showTop="false" v-bind:cards="collection"></card-collection>

      <nav>
        <ul class="pagination">
          <li v-bind:class="'page-item' + (currentPage == 1 ? ' disabled' : '')">
            <a class="page-link" tabindex="-1" aria-label="Previous" v-on:click="currentPage--">
              <span aria-hidden="true"><i class="fa fa-angle-left" aria-hidden="true"></i></span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <li v-for="page in collection.pages" v-bind:class="'page-item' + (currentPage == page ? ' active' : '')"><a class="page-link" v-on:click="currentPage = page">{{ page }}</a></li>
          <li v-bind:class="'page-item' + (currentPage == collection.pages ? ' disabled' : '')">
            <a class="page-link" aria-label="Next" v-on:click="currentPage++">
              <span aria-hidden="true"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
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
      collection: {
        id: '',
        name: '',
        pages: 0,
        cards: []
      },
      sort: 'new',
      currentPage: 1,
      clientPlatform: window.localStorage.getItem('platform'),
      urlArguments: ''
    }
  },
  methods: {
    getCollection: function (id) {
      var that = this

      // Remove card to provide user input that something has changed while we wait for the backend
      this.collection.cards = []

      window.$.getJSON(this.backendUrl + '/dev/apps/get_collection/id/' + encodeURIComponent(id) + '?platform=' + this.clientPlatform + '&order=' + this.sort + '&page=' + this.currentPage, function (j, s) {
        if (s === 'success') {
          that.collection = j
        } else {
          console.error(s)
          console.error(j)
        }
      })
    }
  },
  beforeMount: function () {
    // Set url arguments if exist
    this.platform ? (this.urlArguments = '?platform=' + this.platform) : ''

    if (this.clientPlatform == null) {
      this.clientPlatform = 'basalt'
    }

    this.getCollection(this.$route.params.id)
  },
  watch: {
    sort: function () {
      this.getCollection(this.$route.params.id)
    },
    currentPage: function () {
      this.getCollection(this.$route.params.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn-group {
    margin-bottom: 25px;
  }
</style>
