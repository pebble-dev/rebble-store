<template>
  <div>
    <header>
      <div class=" title-card search">
        <input type="text" placeholder="Search" v-model="searchText" v-on:keyup.enter="search">
      </div>
    </header>
    <main class="apps container text-center">
      <card-collection :showTop="false" v-bind:cards="searchResults"></card-collection>

      <nav>
        <ul class="pagination">
          <li class="page-item disabled">
            <a class="page-link" href="#" tabindex="-1" aria-label="Previous">
              <span aria-hidden="true"><i class="fa fa-angle-left" aria-hidden="true"></i></span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <li class="page-item active">
            <a class="page-link" href="#">1 <span class="sr-only">(current)</span></a>
          </li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">4</a></li>
          <li class="page-item"><a class="page-link" href="#">5</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
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
  name: 'search',
  components: {
    CardCollection
  },
  props: {
    backendUrl: '',
    authUrl: ''
  },
  data: function () {
    return {
      searchText: '',
      searchResults: {
        cards: []
      }
    }
  },
  methods: {
    search: function () {
      if (this.searchText !== '') {
        var that = this

        window.$.getJSON(this.backendUrl + '/dev/apps/search/' + encodeURIComponent(this.searchText), function (j, s) {
          if (s === 'success') {
            that.searchResults = j
          } else {
            console.error(s)
            console.error(j)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title-card {
  padding: 0;
}

.search {
  input {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    width: 100%;
    height: 70px;
    font-size: 1.75rem;
    padding: 20px;
    border: 0;
    background: none;
    color: #373a3c;
    &:focus {
      outline: none;
    }
  }
}
</style>
