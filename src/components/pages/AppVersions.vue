<template>
  <div>
    <header>
      <div class="app-banner">
        <img v-if="app.assets.appBanner != ''" v-bind:src="app.assets.appBanner" alt="App Banner">
      </div>
    </header>
    <app-title-bar v-bind:app="app"></app-title-bar>

    <main class="text-center">
      <div class="card subsection text-left p-3 app-details" v-for="version in versions.versions">
        <h2>Version {{ version.number }}</h2> <h3 class="float-right">{{ version.release_date | formatDate }}</h3><hr>
        <pre class="description">{{ version.description }}</pre>
      </div>
    </main>
  </div>
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
    authUrl: ''
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
    },
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
    this.get_versions(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
@import './static/css/_variables.scss';

// _app-details.scss
// App details page styles

// Screenshots slider
.screenshots {
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    display: flex;
    margin-bottom: 40px;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    &::-webkit-scrollbar {
        background: transparent;
        width: 0 !important;
    }
    img {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 5px;
        margin-top: 5px;
        user-drag: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-drag: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }
    // This spacer is the one that centers the first screenshot
    .screenshot-spacer {
        width: calc(50vw - 92px);
        height: 168px;
        display: table;
    }
}

// Similar to carousel but only used when displaying only one image
.app-banner {
  max-width: 720px;
  max-height: 320px;
  margin-left: auto;
  margin-right: auto;

  img {
      width: 100%;
      max-width: 720px;
  }
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

// Title bar displayed below app banner
.app-title-bar {
    padding-left: 68px !important;
    img {
        position: absolute;
        border-radius: 4px;
        width: 42px;
        height: 42px;
        left: 16px;
    }
    // Author name and app title text container
    .title-author {
        height: 42px;
        margin-top: -3px;
        margin-bottom: 3px;
        display: inline-block;
        h1 {
            font-size: 19px;
            line-height: 26px;
            display: inline;
            color: #fff;
        }
        h2 {
            line-height: 16px;
            font-size: 16px;
            color: #c3c3c3;
            margin: 0;
        }

        // Styles for small screens
        @media screen and (max-width: 430px) {
            h1 {
                font-size: 15px;
            }
            h2 {
                font-size: 12px;
            }
        }
        @media screen and (max-width: 320px) {
            h1 {
                font-size: 12px;
            }
            h2 {
                font-size: 10px;
            }
        }
    }

    // Set styles of buttons in the app-button-container (app-details and app-versions page)
    .app-button-container{
        margin-top: 2px;
        margin-bottom: 2px;
        .btn {
            @media screen and (max-width: 430px) {
                // styles for when screen smaller than 430px to avoid breaking all styles (they make things smaller)
                margin-top: 3px;
                font-size: 0.7rem;
                padding: .5rem .5rem;
            }

            // Set thumbs up button styles
            &.btn-thumbs-up {
                // Styles for when it is in focus, hovered, or active
                &:hover, &:focus, &.active {
                    color: #333;
                    outline: none;
                }
            }
        }
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
        white-space: -moz-pre-wrap;
        white-space: -pre-wrap;
        white-space: -o-pre-wrap;
    }

    // App extra-info table (Author, Version, Release date, etc...)
    table {
        margin-top: 30px;
        margin-bottom: 30px;
        tr td {
            padding-right: 10px;
        }
        tr td:last-child {
            padding-right: 0;
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
