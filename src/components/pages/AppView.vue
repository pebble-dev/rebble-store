<template>
  <section v-bind:class="app.type" >
    <header v-bind:class="(platform && !app.assets.appBanner) ? 'inApp no-banner': ''">
      <div class="app-banner">
        <img v-if="app.assets.appBanner != ''" v-bind:src="app.assets.appBanner" alt="App Banner">
      </div>
    </header>
    <app-title-bar v-bind:urlArguments="urlArguments" v-bind:app="app" v-bind:class="(platform && !app.assets.appBanner) ? 'title-bar extra-margin': ''"></app-title-bar>

    <router-view v-bind:app="app" v-bind:urlArguments="urlArguments" v-bind:backendUrl="backendUrl" v-bind:clientWatchPlatform="clientWatchPlatform"></router-view>
  </section>
</template>

<script>
import AppTitleBar from './widgets/AppTitleBar'
import ScreenshotList from './widgets/ScreenshotList'

export default {
  name: 'app-view',
  components: {
    AppTitleBar,
    ScreenshotList
  },
  props: {
    backendUrl: '',
    platform: ''
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
      'urlArguments': '',
      clientWatchPlatform: window.localStorage.getItem('watchPlatform')
    }
  },
  methods: {
    get_app: function (id) {
      var that = this
      this.$http.get(this.backendUrl + '/dev/apps/get_app/id/' + id).then(response => {
        that.app = response.body
      }, response => {
        console.error(response)
      })
    }
  },
  beforeMount: function () {
    // Set url arguments if exist
    this.platform ? (this.urlArguments = '?platform=' + this.platform) : ''

    this.get_app(this.$route.params.id)
    if (this.clientWatchPlatform == null) {
      this.clientWatchPlatform = 'basalt'
    }
  }
}
</script>

<style lang="scss">
@import './static/css/_variables.scss';

// _app-details.scss
// App details page styles

// Similar to carousel but only used when displaying only one image
header {
  &.inApp.no-banner {
    padding: 0;
    display: none;
    .app-banner {
      min-height: 0;
    }
  }
  .app-banner {
    margin-bottom: -15px;
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
}

.title-bar.extra-margin {
  margin-top: 43px;
}


// App details container (below screenshots)
.app-details {
  margin-bottom: 0;
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
