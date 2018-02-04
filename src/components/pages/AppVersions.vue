<template>
    <main class="text-center">
      <div class="card subsection text-left p-3 app-details" v-for="(version, index) in versions.versions" v-bind:key="index">
        <h2>Version {{ version.number }}</h2> <h3 class="float-right">{{ version.release_date | formatDate }}</h3><hr>
        <pre class="description">{{ version.description }}</pre>
        </div>
    </main>
</template>

<script>
import AppTitleBar from './widgets/AppTitleBar'

export default {
  name: 'app-version',
  components: {
    AppTitleBar
  },
  props: {
    backendUrl: '',
    urlArguments: '',
    app: {}
  },
  data: function () {
    return {
      versions: {
        'versions': []
      }
    }
  },
  methods: {
    get_versions: function (id) {
      var that = this
      console.log(id)
      let requestUrl = this.backendUrl + '/dev/apps/get_versions/id/' + id
      console.log(requestUrl)
      this.$http.get(requestUrl).then(response => {
        that.versions = response.body
      }, response => {
        console.error(response)
      })
    }
  },
  beforeMount: function () {
    this.get_versions(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
@import './static/css/_variables.scss';

// App details container (below screenshots)
.app-details {
    &:last-of-type {
        margin-bottom: 0;
    }
}
</style>
