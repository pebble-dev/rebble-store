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
  </div>
</template>

<script>
export default {
  name: 'ScreenshotList',
  props: ['app', 'urlArguments', 'devPortalBackendUrl', 'accessToken'],
  data: function () {
    return {
      heartClass: 'btn btn-outline-secondary btn-thumbs-up disabled',
      hearted: false
    }
  },
  methods: {
    get_hearts: function (id) {
      if (this.accessToken !== '' && this.accessToken != null) {
        var that = this
        this.$http.get(this.devPortalBackendUrl + '/users/me', {headers: {Authorization: 'Bearer ' + this.accessToken}}).then(response => {
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
      this.$http.post(this.devPortalBackendUrl + '/applications/' + this.app.id + '/' + operation + '_heart', null, {headers: {Authorization: 'Bearer ' + this.accessToken}}).then(response => {
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
      if (this.accessToken !== '' && this.accessToken != null) {
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
// Add space for icon if watchapp
section.watchapp {
  .app-title-bar {
    padding-left: 68px !important;
  }
}
</style>
