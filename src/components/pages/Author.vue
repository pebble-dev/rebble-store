<template>
  <div>
    <header>
      <div class="title-card">
        <h3>Apps by: {{ author.name }}</h3>
      </div>
    </header>
    <main class="apps container text-center">
      <card-collection :showTop="false" v-bind:cards="author" v-bind:urlArguments="urlArguments"></card-collection>

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
  name: 'author',
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
      'urlArguments': '',
      author: {
        'id': 0,
        'name': '',
        'cards': []
      }
    }
  },
  methods: {
    get_author: function (id) {
      var that = this
      this.$http.get(this.backendUrl + '/dev/author/id/' + id).then(response => {
        that.author = response.body
      }, response => {
        console.error(response)
      })
    }
  },
  beforeMount: function () {
    // Set url arguments if exist
    this.urlArguments = this.platform ? '?platform=' + this.platform : ''

    this.get_author(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
</style>
