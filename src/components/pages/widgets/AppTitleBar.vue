<i18n>
{
  "en": {
    "requires-companion": "Requires Companion",
    "companion": "Companion"
  }
}
</i18n>

<template>
<!-- Fix url args -->
  <div  v-if="Object.entries(app).length !== 0" v-bind:class="(this.$store.state.userParameters.inApp) ? 'app-title-bar-cont sticky-top': 'app-title-bar-cont'">
      <div class="card subsection-inverse card-inverse text-left p-3 app-title-bar">
        <img class="app-icon" v-if="app.icon_image != null && app.icon_image['48x48'] != ''" v-bind:src="app.icon_image['48x48']">
        <div v-bind:class="app.icon_image ? 'title-author app' :  'title-author face'">
          <h1 class="tile">{{ app.title }}</h1>
          <h2 class="author">{{ app.author }}</h2>
        </div>

        <div class="app-button-container float-right">
          <button type="button" v-bind:class="heartClass" v-on:click="toggle_heart_button_state" ref="heartsButton">
            <svg class="svg-icon icon-thumbs-up" width="25px" height="25px" viewBox="0 0 25 25">
              <use xlink:href="#iconThumbsUp"></use>
            </svg>

            {{ hearts }}
          </button>
          <get-app-button v-bind:app="app" v-bind:state="added"  ref="addButton"></get-app-button>
        </div>
      </div>
      <div class="card subsection-extra card-inverse text-left p-2" v-if=" app.companions != undefined && (app.companions.ios != null || app.companions.android != null) && app.type != 'watchface'">
        <h2 v-if="app.type === 'companion-app'">{{ $t('requires-companion') }}</h2>
        <h2 v-if="app.type !== 'companion-app'">{{ $t('companion') }}</h2>
        <div class="ml-auto">
          <a v-if="app.companions.ios" v-bind:href="app.companions.ios.url" target="_blank">
            <svg class="app-icon" width="22px" height="22px">
              <use xlink:href="#iconApple"></use>
            </svg>
          </a>
          <h2 v-if="app.companions.ios && app.companions.android">
            +
          </h2>
          <a v-if="app.companions.android" v-bind:href="app.companions.android.url" target="_blank">
            <svg class="app-icon" width="22px" height="22px">
              <use xlink:href="#iconAndroid"></use>
            </svg>
          </a>
        </div>
      </div>
  </div>
</template>

<script>
import GetAppButton from './GetAppButton'

export default {
  name: 'ScreenshotList',
  components: {
    GetAppButton
  },
  props: ['app', 'urlArguments'],
  data: function () {
    return {
      heartClass: 'btn btn-outline-secondary btn-thumbs-up disabled',
      hearts: 0,
      hearted: false,
      added: false,
      flagged: false
    }
  },
  methods: {
    get_user_data: function (id) {
      if (this.$store.state.secure.accessToken !== '' && this.$store.state.secure.accessToken != null) {
        this.$http.get(this.$store.state.config.devPortalBackendUrl + '/users/me', {headers: {Authorization: 'Bearer ' + this.$store.state.secure.accessToken}}).then(response => {
          let userInfo = response.body.users[0]
          this.added = !(!userInfo || !~userInfo.added_ids.indexOf(id))
          this.hearted = !(!userInfo || !~userInfo.voted_ids.indexOf(id))
          this.flagged = !(!userInfo || !~userInfo.flagged_ids.indexOf(id))
          console.log(this.added)
          this.build_hearts_class()
        }, response => {
          console.error(response)
        })
      }
    },
    change_heart: function (operation) {
      this.$http.post(this.$store.state.config.devPortalBackendUrl + '/applications/' + this.app.id + '/' + operation + '_heart', null, {headers: {Authorization: 'Bearer ' + this.$store.state.secure.accessToken}}).then(response => {
        if (operation === 'add') {
          this.hearts++
          this.hearted = true
        } else {
          this.hearts--
          this.hearted = false
        }
        this.build_hearts_class()
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
      if (this.$store.state.secure.accessToken !== null) {
        if (this.hearted) {
          this.change_heart('remove')
        } else {
          this.change_heart('add')
        }
        this.build_hearts_class()
      }
    },
    build_hearts_class: function () {
      if (this.$store.state.secure.accessToken !== '' && this.$store.state.secure.accessToken != null) {
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
  watch: {
    'app' (to, from) {
      this.hearts = this.app.hearts
    }
  },
  beforeMount: function () {
    if (this.app.hearts !== undefined) {
      this.hearts = this.app.hearts
    }
    this.get_user_data(this.$route.params.id)
  }
}
</script>

<style lang="scss">
// Title bar displayed below app banner

.app-title-bar {
    display: flex !important;
    flex-direction: row;

    img {
      border-radius: 4px;
      width: 42px;
      min-width: 42px;
      height: 42px;
      margin-right: 5px;
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
      /*@media screen and (max-width: 430px) {
        width: calc(100% - 160px);
      }*/
      //width: calc(100% - 220px);
      width: 100%;

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
      margin-left: auto;
      padding-left: 5px;
      margin-top: 2px;
      margin-bottom: 2px;
      min-width: 206px;
      text-align: right;
      @media screen and (max-width: 430px) {
        min-width: 156px;
      }
      .btn {
        @media screen and (max-width: 430px) {
          // styles for when screen smaller than 430px to avoid breaking all styles (they make things smaller)
          margin-top: 3px;
          font-size: 0.7rem;
          padding: .5rem .5rem;
        }
        &.btn-download {
          margin-left: 2px;
        }

        // Set thumbs up button styles
        &.btn-thumbs-up {
          color: #ccc;
          border-color: #ccc;
          cursor: hand;
          // Styles for when it is in focus, hovered, or active
          &:hover, &:active {
            color: #ccc;
            border-color: #ccc;
            background: none;
          }
          &.active {
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

.card.subsection-extra {
  padding-left: 30px !important;
  padding-right: 30px !important;
  display: flex;
  flex-direction: row;
  h2 {
    font-size: 16px;
    line-height: 26px;
    display: inline-block;
    margin: 0;
  }
  .app-icon {
    margin-top: -4px;
    width: 22px;
    vertical-align: middle;
    color: #333;
    fill: currentColor
  }
}
</style>
