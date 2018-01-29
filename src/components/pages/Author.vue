<template>
  <div>
    <header>
      <div class="title-card">
        <h3>Apps by: {{ author.name }}</h3>
      </div>
    </header>
    <main class="apps container text-center">
      <card-collection :showTop="false" v-bind:cards="author"></card-collection>
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
    authUrl: ''
  },
  data: function () {
    return {
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
      window.$.getJSON(this.backendUrl + '/dev/author/id/' + id, function (j, s) {
        if (s === 'success') {
          that.author = j
        } else {
          console.error(s)
          console.error(j)
        }
      })
    }
  },
  beforeMount: function () {
    this.get_author(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
</style>
