<template>
  <main class="text-center">
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
            <router-link v-bind:to="'/collection/' + app.category_id + urlArguments"><span class="badge badge-pill badge-pebble">{{ app.category }}</span></router-link>
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
        <tr v-if="app.type != 'watchface'">
          <td>Companion App Links</td>
          <td>
            <a v-if="app.companions.ios" v-bind:href="app.companions.ios.url">
              <svg width="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170" version="1.1">
                <path d="m150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929 0.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002 0.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-0.9 2.61-1.85 5.11-2.86 7.51zm-31.26-123.01c0 8.1021-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375-0.119-0.972-0.188-1.995-0.188-3.07 0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.3113 11.45-8.597 4.62-2.2516 8.99-3.4968 13.1-3.71 0.12 1.0831 0.17 2.1663 0.17 3.2409z"/>
              </svg>
            </a>
            <a v-if="app.companions.android" v-bind:href="app.companions.android.url">
              <svg width="24px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-147 -70 294 345">
                <g fill="#a4c639">
                  <use stroke-width="14.4" xlink:href="#b" stroke="#FFF"/>
                  <use xlink:href="#a" transform="scale(-1,1)"/>
                  <g id="a" stroke="#FFF" stroke-width="7.2">
                    <rect rx="6.5" transform="rotate(29)" height="86" width="13" y="-86" x="14"/>
                    <rect id="c" rx="24" height="133" width="48" y="41" x="-143"/>
                  <use y="97" x="85" xlink:href="#c"/>
                  </g>
                  <g id="b">
                    <ellipse cy="41" rx="91" ry="84"/>
                    <rect rx="22" height="182" width="182" y="20" x="-91"/>
                  </g>
                </g>
                <g stroke="#FFF" stroke-width="7.2" fill="#FFF">
                  <path d="m-95 44.5h190"/><circle cx="-42" r="4"/><circle cx="42" r="4"/>
                </g>
              </svg>
            </a>
            <span v-if="app.companions.ios == null && app.companions.android == null">None</span>
          </td>
        </tr>
      </table>
      <router-link v-bind:to="'/app/' + $route.params.id + '/versions/' + urlArguments" class="app-button">
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
      <router-link v-bind:to="'/author/' + app.developer_id + urlArguments" class="app-button">
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
  props: [
    'urlArguments',
    'app',
    'clientWatchPlatform'
  ]
}
</script>

<style lang="scss" scoped>
// App details container (below screenshots)
.app-details {
  margin-bottom: 0;
}
</style>
