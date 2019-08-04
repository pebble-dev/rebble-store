<template>
  <span>
    <a v-bind:href="'pebble://appstore/' + app.id" class="btn btn-outline-pebble btn-download" v-if="$store.state.inApp !== true && ($store.state.storeParameters.platform === 'all' || app.compatibility[$store.state.storeParameters.platform].supported === true)">
      <svg class="svg-icon icon-download" width="25px" height="25px" viewBox="0 0 25 25">
        <use xlink:href="#iconDownload"></use>
      </svg>
      GET
    </a>
    <button v-on:click="check_app" class="btn btn-outline-pebble btn-download" :class="added || loading ? 'active': ''|| (added === null || !hardwareSupported || !platformSupported)?'disabled':''" v-if="$store.state.inApp === true">
      <svg class="svg-icon icon-download" width="25px" height="25px" viewBox="0 0 25 25">
        <use xlink:href="#iconDownload"></use>
      </svg>
      {{(loading)?'...':'GET'}}
    </button>
    <b-modal id="modal-permissions" centered title="Pebble Permissions" ok-title="Accept"  cancel-title="Reject" @ok="add_app()">
      <p>"{{app.title}}" is requesting access to the following services.</p>
      <b-list-group class="my-4">
        <b-list-group-item v-for="(item, index) in permissions" :key="index">{{ item }}</b-list-group-item>
      </b-list-group>
      <p>If you tap on accept you will grant "{{app.title}}" access to read and use your data.</p>
    </b-modal>
    <b-modal id="modal-companion" centered title="Companion Required" ok-title="Get"  cancel-title="Cancel" @ok="get_companion()">
      <p class="my-4">"{{app.title}}" requires a companion a to be used.</p>
    </b-modal>
  </span>
</template>

<script>
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
      default: null
    }
  },
  data: function () {
    return {
      loading: false,
      added: false,
      hardwareSupported: false,
      platformSupported: false,
      permissions: []
    }
  },
  methods: {
    add_app () {
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
      }, (res) => {
        if (res.added_to_locker) {
          this.loading = false
          this.added = true
        }
      })
    },
    get_companion () {
      if (this.$store.state.inApp) {
        Native.send('openURL', {
          url: this.app.companions[this.$store.state.storeParameters.platform].url
        })
      } else {
        window.open(this.app.companions[this.$store.state.storeParameters.platform].url, '_blank')
      }
    },
    check_app () {
      if (!this.hardwareSupported || !this.platformSupported || this.added === true || this.loading) return
      if (this.permissions.length > 0) {
        this.$bvModal.show('modal-permissions')
        return
      }
      if (this.app.type === 'companion-app') {
        this.$bvModal.show('modal-companion')
        return
      }
      this.add_app()
    },
    check_supported () {
      this.hardwareSupported = this.app.compatibility && this.app.compatibility[this.$store.state.storeParameters.hardware] && this.app.compatibility[this.$store.state.storeParameters.hardware].supported === true
      this.platformSupported = this.$store.state.storeParameters.platform === 'all' || this.app.compatibility[this.$store.state.storeParameters.platform].supported
    },
    create_permissions () {
      if (this.app.capabilities != null) {
        this.permissions = this.app.capabilities
        this.permissions.splice(this.permissions.indexOf('configurable'))
      }
    }
  },
  watch: {
    'state' (to, from) {
      this.added = this.state
    },
    'app' (to, from) {
      this.check_supported()
      this.create_permissions()
    }
  },
  beforeMount: function () {
    this.added = this.state
    if (this.app !== null) {
      this.check_supported()
      this.create_permissions()
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
