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
          Sort by Popularity
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
          <li v-for="(page, index) in collection.pages" v-bind:key="index" v-bind:class="'page-item' + (currentPage == page ? ' active' : '')"><a class="page-link" v-on:click="currentPage = page">{{ page }}</a></li>
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
    authUrl: '',
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
      clientWatchPlatform: window.localStorage.getItem('watchPlatform'),
      urlArguments: ''
    }
  },
  methods: {
    getCollection: function (id) {
      var that = this

      // Remove card to provide user input that something has changed while we wait for the backend
      this.collection.cards = [
        {
          id: '',
          title: '',
          type: '',
          image_url: '',
          thumbs_up: 0
        },
        {
          id: '',
          title: '',
          type: '',
          image_url: '',
          thumbs_up: 0
        },
        {
          id: '',
          title: '',
          type: '',
          image_url: '',
          thumbs_up: 0
        },
        {
          id: '',
          title: '',
          type: '',
          image_url: '',
          thumbs_up: 0
        },
        {
          id: '',
          title: '',
          type: '',
          image_url: '',
          thumbs_up: 0
        },
        {
          id: '',
          title: '',
          type: '',
          image_url: '',
          thumbs_up: 0
        },
        {
          id: '',
          title: '',
          type: '',
          image_url: '',
          thumbs_up: 0
        }
      ]

      this.$http.get(this.backendUrl + '/dev/apps/get_collection/id/' + encodeURIComponent(id) + '?platform=' + this.clientWatchPlatform + '&order=' + this.sort + '&page=' + this.currentPage).then(response => {
        that.collection = response.body
      }, response => {
        console.error(response)
      })
    }
  },
  beforeMount: function () {
    // Set url arguments if exist
    this.urlArguments = this.platform ? '?platform=' + this.platform : ''

    if (this.clientWatchPlatform == null) {
      this.clientWatchPlatform = 'basalt'
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
    .btn.btn-outline-secondary {
      &:hover {
        color: #fff;
      }
    }
  }
</style>
