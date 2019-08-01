<template>
  <main v-if="app != null" class="text-center">
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
            <router-link v-bind:to="'/collection/' + app.category_id"><span class="badge badge-pill badge-pebble">{{ app.category }}</span></router-link>
          </td>
        </tr>
        <tr>
          <td>Updated</td>
          <td>{{ app.latest_release.published_date | formatDate }}</td>
        </tr>
        <tr>
          <td>Version</td>
          <td>{{ app.latest_release.version }}</td>
        </tr>
      </table>
      <router-link v-bind:to="'/app/' + $route.params.id + '/versions/'" class="app-button">
        <div>
          Version Information <i class="fa fa-angle-right float-right" aria-hidden="true"></i>
        </div>
      </router-link>
      <a v-if="app.website != ''" v-bind:href="app.website" class="app-button">
        <div>
          Website Link <i class="fa fa-angle-right float-right" aria-hidden="true"></i>
        </div>
      </a>
      <!--a v-if="app.appInfo.supportUrl != ''" v-bind:href="app.appInfo.supportUrl" class="app-button">
        <div>Support <i class="fa fa-angle-right float-right" aria-hidden="true"></i>
        </div>
      </a-->
      <a v-if="app.source != null" v-bind:href="app.source" class="app-button">
        <div>Source code <i class="fa fa-angle-right float-right" aria-hidden="true"></i>
        </div>
      </a>
      <router-link v-bind:to="'/author/' + app.developer_id" class="app-button">
        <div>More From This Developer<i class="fa fa-angle-right float-right" aria-hidden="true"></i>
        </div>
      </router-link>
      <a v-if="app.latest_release.pbw_file != ''" v-bind:href="app.latest_release.pbw_file" class="app-button">
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
  }
}
</script>

<style lang="scss" scoped>
// App details container (below screenshots)
.app-details {
  margin-bottom: 0;
}
</style>
