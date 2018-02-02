<template>
  <main class="text-center">
    <screenshot-list v-bind:platforms="app.assets.screenshots" v-bind:clientPlatform="clientPlatform"></screenshot-list>

    <div class="card subsection text-left p-3 app-details">
      <h1>Description</h1> <hr>
      <pre class="description">{{ app.description }}</pre>

      <table class="extra-table">
        <tr>
          <td>Developer</td>
          <td>{{ app.author.name }}</td>
        </tr>
        <tr>
          <td>Tags</td>
          <td v-for="tag in app.appInfo.tags">
            <router-link v-bind:to="'/collection/' + tag.id + urlArguments"><span class="badge badge-pill badge-pebble">{{ tag.name }}</span></router-link>
          </td>
        </tr>
        <tr>
          <td>Updated</td>
          <td>{{ app.appInfo.updated | formatDate }}</td>
        </tr>
        <tr>
          <td>Version</td>
          <td>{{ app.appInfo.version }}</td>
        </tr>
      </table>
      <router-link v-bind:to="'/app/' + $route.params.id + '/versions/' + urlArguments" class="app-button">
        <div>
          Version Information <i class="fa fa-angle-right float-right" aria-hidden="true"></i>
        </div>
      </router-link>
      <a v-if="app.appInfo.authorUrl != ''" v-bind:href="app.appInfo.authorUrl" class="app-button">
        <div>
          Website Link <i class="fa fa-angle-right float-right" aria-hidden="true"></i>
        </div>
      </a>
      <a v-if="app.appInfo.supportUrl != ''" v-bind:href="app.appInfo.supportUrl" class="app-button">
        <div>Support <i class="fa fa-angle-right float-right" aria-hidden="true"></i>
        </div>
      </a>
      <a v-if="app.appInfo.sourceUrl != ''" v-bind:href="app.appInfo.sourceUrl" class="app-button">
        <div>Source code <i class="fa fa-angle-right float-right" aria-hidden="true"></i>
        </div>
      </a>
      <router-link v-bind:to="'/author/' + app.author.id + urlArguments" class="app-button">
        <div>More From This Developer<i class="fa fa-angle-right float-right" aria-hidden="true"></i>
        </div>
      </router-link>
      <a v-if="app.appInfo.pbwUrl != ''" v-bind:href="app.appInfo.pbwUrl" class="app-button">
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
    urlArguments: '',
    app: {},
    clientPlatform: ''
  }
}
</script>

<style lang="scss" scoped>
// App details container (below screenshots)
.app-details {
  margin-bottom: 0;
}
</style>
