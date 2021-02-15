<template>
  <main v-if="Object.entries(app).length !== 0" class="text-center">
    <screenshot-list v-bind:screenshots="app.screenshot_images"></screenshot-list>

    <div class="card subsection text-left p-3 app-details">
      <h1>Description</h1> <hr>
      <pre class="description">{{ app.description }}</pre>
      <table class="extra-table">
        <tr>
          <td>Developer</td>
          <td>{{ app.author }}</td>
        </tr>
        <tr>
          <td>Category</td>
          <td>
            <router-link v-if="app.type !== 'watchapp'" v-bind:to="'/collection/' + app.category_id"><span class="badge badge-pill badge-pebble">{{ app.category }}</span></router-link>
            <span v-if="app.type === 'watchapp'" class="badge badge-pill badge-pebble">{{ app.category }}</span>
          </td>
        </tr>
        <tr v-if="app.latest_release">
          <td>Updated</td>
          <td>{{ app.latest_release.published_date | formatDate }}</td>
        </tr>
        <tr v-if="app.latest_release">
          <td>Version</td>
          <td>{{ app.latest_release.version }}</td>
        </tr>
      </table>
      <router-link v-if="app.changelog.length > 0" v-bind:to="'/app/' + $route.params.id + '/versions/'" class="app-button">
        <div>
          Version Information <i class="fa fa-angle-right float-right" aria-hidden="true"></i>
        </div>
      </router-link>
      <a v-if="app.website != null" v-on:click="openExternal(app.website)" class="app-button">
        <div>
          Website Link <i class="fa fa-angle-right float-right" aria-hidden="true"></i>
        </div>
      </a>
      <a v-if="app.source != null" v-on:click="openExternal(app.source)" class="app-button" >
        <div>Source code <i class="fa fa-angle-right float-right" aria-hidden="true"></i></div>
      </a>
      <router-link v-bind:to="'/author/' + app.developer_id" class="app-button">
        <div>More From This Developer<i class="fa fa-angle-right float-right" aria-hidden="true"></i>
        </div>
      </router-link>
      <a v-if="app.latest_release && app.latest_release.pbw_file != '' && $store.state.userParameters.devMode" v-on:click="openExternal(app.latest_release.pbw_file)" class="app-button">
        <div>Download .pbw<i class="fa fa-angle-right float-right" aria-hidden="true"></i>
        </div>
      </a>
    </div>
  </main>
</template>

<script>
import ScreenshotList from './widgets/ScreenshotList'

export default {
  name: 'app-details',
  components: {
    ScreenshotList
  },
  props: {
    app: {
      default: null
    },
    clientWatchPlatform: {
      default: null
    }
  },
  watch: {
    'app' (to, from) {
      this.setTitle(this.app.title)
    }
  },
  beforeMount: function () {
    if (this.app.title !== undefined) {
      this.setTitle(this.app.title)
    }
  }
}
</script>

<style lang="scss" scoped>
// App details container (below screenshots)
.app-details {
  margin-bottom: 0;
}
</style>
