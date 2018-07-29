<template>
  <div v-bind:class="(urlArguments) ? 'app-title-bar-cont sticky-top': 'app-title-bar-cont'">
      <div class="card subsection-inverse card-inverse text-left p-3 app-title-bar">
        <img class="app-icon" v-if="app.icon_image != null && app.icon_image['48x48'] != ''" v-bind:src="app.icon_image['48x48']">
        <div v-bind:class="app.icon_image ? 'title-author app' :  'title-author face'">
          <h1 class="tile">{{ app.title }}</h1>
          <h2 class="author">{{ app.author }}</h2>
        </div>

        <div class="app-button-container float-right">
          <button type="button" v-bind:class="heartClass" v-on:click="toggle_heart_button_state">
          <svg class="svg-icon icon-thumbs-up" width="25px" height="25px" viewBox="0 0 25 25">
            <use xlink:href="#iconThumbsUp"></use>
          </svg>

          {{ app.hearts }}
          </button>
          <a v-bind:href="'pebble://appstore/' + app.id" class="btn btn-outline-pebble btn-download">
          <svg class="svg-icon icon-download" width="25px" height="25px" viewBox="0 0 25 25">
            <use xlink:href="#iconDownload"></use>
          </svg>
          GET
          </a>
        </div>
      </div>
      <div class="card subsection-extra card-inverse text-left p-2" v-if="(app.companions.ios != null || app.companions.android != null) && app.type != 'watchface'">
        <span>Companion Apps:</span>
        <a v-if="app.companions.ios" v-bind:href="app.companions.ios.url">
          <svg class="app-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170" version="1.1">
            <path d="m150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929 0.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002 0.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-0.9 2.61-1.85 5.11-2.86 7.51zm-31.26-123.01c0 8.1021-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375-0.119-0.972-0.188-1.995-0.188-3.07 0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.3113 11.45-8.597 4.62-2.2516 8.99-3.4968 13.1-3.71 0.12 1.0831 0.17 2.1663 0.17 3.2409z"/>
          </svg>
        </a>
        <a v-if="app.companions.android" v-bind:href="app.companions.android.url">
          <svg class="app-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-147 -70 294 345">
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
      </div>
  </div>
</template>

<script>
export default {
  name: 'ScreenshotList',
  props: ['app', 'urlArguments'],
  data: function () {
    return {
      heartClass: 'btn btn-outline-secondary btn-thumbs-up disabled',
      hearted: false
    }
  },
  methods: {
    get_hearts: function (id) {
      if (this.$store.state.accessToken !== '' && this.$store.state.accessToken != null) {
        var that = this
        this.$http.get(this.$store.state.devPortalBackendUrl + '/users/me', {headers: {Authorization: 'Bearer ' + this.$store.state.accessToken}}).then(response => {
          console.log(response.body)
          let foundApp = response.body.users[0].voted_ids.find(function (appId) {
            return id === appId
          })

          if (foundApp != null) {
            that.hearted = true
          } else {
            that.hearted = false
          }
          that.build_hearts_class()
        }, response => {
          console.error(response)
        })
      }
    },
    change_heart: function (operation) {
      this.$http.post(this.$store.state.devPortalBackendUrl + '/applications/' + this.app.id + '/' + operation + '_heart', null, {headers: {Authorization: 'Bearer ' + this.$store.state.accessToken}}).then(response => {
      }, response => {
        console.error(response)
        if (operation === 'add') {
          this.hearted = false
        } else {
          this.hearted = true
        }
        this.build_hearts_class()
      })
    },
    toggle_heart_button_state: function () {
      if (this.hearted) {
        this.change_heart('remove')
        this.hearted = false
      } else {
        this.change_heart('add')
        this.hearted = true
      }
      this.build_hearts_class()
    },
    build_hearts_class: function () {
      if (this.$store.state.accessToken !== '' && this.$store.state.accessToken != null) {
        if (this.hearted) {
          this.heartClass = 'btn btn-outline-secondary btn-thumbs-up active'
        } else {
          this.heartClass = 'btn btn-outline-secondary btn-thumbs-up'
        }
      } else {
        this.heartClass = 'btn btn-outline-secondary btn-thumbs-up disabled'
      }
    }
  },
  beforeMount: function () {
    this.get_hearts(this.$route.params.id)
  }
}
</script>

<style lang="scss">
// Title bar displayed below app banner

.app-title-bar {
    img {
        position: absolute;
        border-radius: 4px;
        width: 42px;
        height: 42px;
        left: 16px;
    }
    // Author name and app title text container
    .title-author {
      height: 45px;
      margin-top: -3px;
      margin-bottom: 0;
      display: inline-block;
      max-width: 493px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      @media screen and (max-width: 430px) {
        width: calc(100% - 160px);
      }
      width: calc(100% - 220px);

      h1 {
        font-size: 19px;
        line-height: 26px;
        display: inline-block;
        color: #fff;
        margin-bottom: 0;
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
    .app-button-container {
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
          color: #ccc;
          border-color: #ccc;
          // Styles for when it is in focus, hovered, or active
          &:hover, &:active, &.active {
            color: #333;
            outline: none;
            background: #ccc;
          }

          &.disabled:hover {
            // Don't change any style if disabled
            color: #ccc;
            background: none;
          }
        }
      }
    }
}

.app-icon {
  width: 22px;
  vertical-align: middle;
}

// Add space for icon if watchapp
section.watchapp {
  .app-title-bar {
    padding-left: 68px !important;
  }
}
</style>
