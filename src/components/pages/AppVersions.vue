<template>
    <main class="text-center">
        <div class="card subsection text-left p-3 app-details" v-for="version in versions.versions">
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
      window.$.getJSON(this.backendUrl + '/dev/apps/get_versions/id/' + id, function (j, s) {
        if (s === 'success') {
          that.versions = j
        } else {
          console.error(s)
          console.error(j)
        }
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
