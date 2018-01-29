<template>
  <section v-bind:class="app.type" >
    <header>
      <div class="app-banner">
        <img v-if="app.assets.appBanner != ''" v-bind:src="app.assets.appBanner" alt="App Banner">
      </div>
    </header>
    <app-title-bar v-bind:app="app"></app-title-bar>

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
              <a v-bind:href="'/collection/' + tag.id"><span class="badge badge-pill badge-pebble">{{ tag.name }}</span></a>
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
        <a v-bind:href="'/app-versions/' + $route.params.id" class="app-button">
          <div>
            Version Information <i class="fa fa-angle-right float-right" aria-hidden="true"></i>
          </div>
        </a>
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
        <a v-bind:href="'/author/' + app.author.id" class="app-button">
          <div>More From This Developer<i class="fa fa-angle-right float-right" aria-hidden="true"></i>
          </div>
        </a>
        <a v-if="app.appInfo.pbwUrl != ''" v-bind:href="app.appInfo.pbwUrl" class="app-button">
          <div>Download .pbw<i class="fa fa-angle-right float-right" aria-hidden="true"></i>
          </div>
        </a>
      </div>
    </main>
  </section>
</template>

<script>
import AppTitleBar from './widgets/AppTitleBar'
import ScreenshotList from './widgets/ScreenshotList'

export default {
  name: 'app-details',
  components: {
    AppTitleBar,
    ScreenshotList
  },
  props: {
    backendUrl: ''
  },
  data: function () {
    return {
      app: {
        'id': '',
        'title': '',
        'author': {
          'id': -1,
          'name': ''
        },
        'description': '',
        'thumbs_up': 0,
        'type': '',
        'supported_platforms': [],
        'published_date': '2000-01-01T00:00:00.000+00:00',
        'appInfo': {
          'pbwUrl': '',
          'rebbleReady': false,
          'tags': [],
          'updated': '2000-01-01T00:00:00.000+00:00',
          'version': '',
          'supportUrl': '',
          'authorUrl': '',
          'sourceUrl': ''
        },
        'assets': {
          'appBanner': '',
          'appIcon': '',
          'screenshots': []
        },
        'doomsday_backup': false
      },
      clientPlatform: window.localStorage.getItem('platform')
    }
  },
  methods: {
    get_app: function (id) {
      var that = this
      window.$.getJSON(this.backendUrl + '/dev/apps/get_app/id/' + id, function (j, s) {
        if (s === 'success') {
          that.app = j
        } else {
          console.error(s)
          console.error(j)
        }
      })
    }
  },
  beforeMount: function () {
    this.get_app(this.$route.params.id)
    if (this.clientPlatform == null) {
      this.clientPlatform = 'basalt'
    }
  }
}
</script>

<style lang="scss" scoped>
@import './static/css/_variables.scss';

// _app-details.scss
// App details page styles

// Similar to carousel but only used when displaying only one image
.app-banner {
  max-width: 720px;
  max-height: 320px;
  margin-left: auto;
  margin-right: auto;
  min-height: 30px;

  img {
      width: 100%;
      max-width: 720px;
  }
}

// App details container (below screenshots)
.app-details {
  // Main title
  h1 {
    font-size: 20px;
    margin: none;
  }
  // Separator
  hr {
    margin-top: 4px;
  }

  // H2 and H3 used in app-versions
  h2 {
    font-size: 16px;
    display: inline;
  }
  h3 {
    display: inline;
    font-size: 14px;
    margin-bottom: 0;
    margin-top: 4px;
  }

  // App Description container
  pre.description {
    // Make sentences break and prevent scrollbars
    word-wrap: break-word;
    white-space: pre-wrap;

    // Change app description font and weight
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
  }

  // App extra-info table (Author, Version, Release date, etc...)
  table {
    margin-top: 30px;
    margin-bottom: 30px;
    tr td {
      padding-right: 10px;
      font-family: 'Open Sans', sans-serif;
    }
    tr td:last-child {
      padding-right: 0;
      // A second font to make it look different from the first column
      font-family: 'Raleway', sans-serif;
    }
  }

  // Buttons at the bottom of the app-details container
  a.app-button {
    div {
      width: calc(100% + 2rem);
      padding: 1rem;
      margin-left: -16px;
      margin-right: -16px;
      border-top: 1px solid #e1e1e1;
      // Change the fonts from the buttons at the bottom of the app-details container
      font-family: 'Open Sans', sans-serif;
    }

    color: $pebble-color;
    &:last-child {
      div {
        margin-bottom: -1rem;
      }
    }
    &:hover, &:focus {
      text-decoration: none;
      outline: none;
    }
  }
}
</style>
