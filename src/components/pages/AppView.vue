<template>
  <section v-bind:class="app.type" >
    <header v-bind:class="(platform && !app.header_images) ? 'inApp no-banner': ''">
      <single-banner v-if="app.header_images != ''" v-bind:bannerSrc="app.header_images[0].orig"></single-banner>
    </header>
    <app-title-bar v-bind:urlArguments="urlArguments" v-bind:app="app" v-bind:class="(platform && !app.header_images) ? 'title-bar extra-margin': ''" v-bind:devPortalBackendUrl="devPortalBackendUrl" v-bind:accessToken="storeParameters.accessToken"></app-title-bar>

    <router-view v-bind:app="app" v-bind:urlArguments="urlArguments" v-bind:backendUrl="backendUrl" v-bind:clientWatchPlatform="clientWatchPlatform"></router-view>
  </section>
</template>

<script>
import AppTitleBar from './widgets/AppTitleBar'
import SingleBanner from './widgets/SingleBanner'
import ScreenshotList from './widgets/ScreenshotList'

export default {
  name: 'app-view',
  components: {
    AppTitleBar,
    ScreenshotList,
    SingleBanner
  },
  props: {
    backendUrl: '',
    devPortalBackendUrl: '',
    storeParameters: ''
  },
  data: function () {
    return {
      app: {},
      'urlArguments': '',
      clientWatchPlatform: window.localStorage.getItem('watchPlatform')
    }
  },
  methods: {
    get_app: function (id) {
      var that = this
      this.$http.get(this.backendUrl + '/apps/id/' + id).then(response => {
        that.app = response.body.data[0]
      }, response => {
        console.error(response)
      })
    }
  },
  beforeMount: function () {
    // Set url arguments if exist
    this.urlArguments = this.platform ? '?platform=' + this.platform : ''

    this.get_app(this.$route.params.id)
    if (this.clientWatchPlatform == null) {
      this.clientWatchPlatform = 'basalt'
    }
  }
}
</script>

<style lang="scss">
// _app-details.scss
// App details page styles

// Similar to carousel but only used when displaying only one image
header {
  &.inApp.no-banner {
    padding: 0;
    display: none;
    min-height: 0;
  }
  min-height: 90px;
  .app-banner {
    margin-bottom: -15px;
    max-width: 720px;
    max-height: 320px;
    margin-left: auto;
    margin-right: auto;

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
