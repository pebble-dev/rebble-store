<template>
  <span>
    <a v-bind:href="'pebble://appstore/' + app.id" class="btn btn-outline-pebble btn-download" v-if="$store.state.inApp !== true && ($store.state.storeParameters.platform === 'all' || app.compatibility[$store.state.storeParameters.platform].supported === true)">
      <svg class="svg-icon icon-download" width="25px" height="25px" viewBox="0 0 25 25">
        <use xlink:href="#iconDownload"></use>
      </svg>
      GET
    </a>
    <button v-on:click="add_app" class="btn btn-outline-pebble btn-download" :class="state || loading ? 'disabled': ''" v-if="$store.state.inApp === true">
      <svg class="svg-icon icon-download" width="25px" height="25px" viewBox="0 0 25 25">
        <use xlink:href="#iconDownload"></use>
      </svg>
      GET
    </button>
  </span>
</template>

<script>
/* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */
import { Native } from '../../../services'

export default {
  name: 'get-app-button',
  components: {
  },
  props: {
    app: {
      default: null
    },
    state: {
      default: false
    }
  },
  data: function () {
    return {
      loading: false
    }
  },
  methods: {
    add_app () {
      if (this.state || this.loading) return
      this.loading = true
      Native.send('loadAppToDeviceAndLocker', {
        id: this.app.id,
        uuid: this.app.uuid,
        title: this.app.title,
        list_image: this.app.list_image && this.app.list_image['144x144'],
        icon_image: this.app.icon_image && this.app.icon_image['48x48'],
        screenshot_image: this.app.screenshot_images && this.app.screenshot_images[0] && this.app.screenshot_images[0][Object.keys(this.app.screenshot_images[0])[0]],
        type: this.app.type,
        pbw_file: this.app.latest_release.pbw_file,
        links: {
          add: this.$store.state.backendUrl + '/applications/' + this.app.id + '/add',
          remove: this.$store.state.backendUrl + '/applications/' + this.app.id + '/remove',
          share: 'http://apps.rebble.io/app/' + this.app.id
        }
      }, function (res) {
        if (res.added_to_locker) {
          this.loading = false
          this.state = true
        }
      })
    }

  },
  beforeMount: function () {
  }
}
</script>

<style lang='scss' scoped>
</style>
