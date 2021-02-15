<template>
  <span>
    <a v-bind:href="'pebble://appstore/' + app.id" class="btn btn-outline-pebble btn-download" v-if="$store.state.userParameters.inApp !== true && ($store.state.userParameters.platform === 'all' || app.compatibility[$store.state.userParameters.platform].supported === true)">
      <svg class="svg-icon icon-download" width="25px" height="25px" viewBox="0 0 25 25">
        <use xlink:href="#iconDownload"></use>
      </svg>
      GET
    </a>
    <button v-on:click="check_app" class="btn btn-outline-pebble btn-download" :class="added || loading ? 'active': ''|| (added === null || !hardwareSupported || !platformSupported)?'disabled':''" v-if="$store.state.userParameters.inApp === true">
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
      this.openExternal(this.app.companions[this.$store.state.userParameters.platform].url)
    },
    check_app () {
      if (this.added === true || this.loading) return
      if (!this.hardwareSupported) {
        return this.hardware_compatibility_modal()
      }
      if (!this.platformSupported) {
        return this.platform_compatibility_modal()
      }
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
      this.hardwareSupported = this.$store.state.userParameters.hardware === 'all' || (this.app.compatibility && this.app.compatibility[this.$store.state.userParameters.hardware] !== undefined && this.app.compatibility[this.$store.state.userParameters.hardware].supported === true)
      this.platformSupported = this.$store.state.userParameters.platform === 'all' || this.app.compatibility[this.$store.state.userParameters.platform].supported
    },
    create_permissions () {
      if (this.app.capabilities != null) {
        this.permissions = this.app.capabilities
        this.permissions.splice(this.permissions.indexOf('configurable'))
      }
    },
    hardware_compatibility_modal () {
      this.$bvToast.toast('Sorry! This app is not compatible with your Pebble smartwatch.', {
        title: 'Unable to add to locker',
        autoHideDelay: 5000,
        appendToast: true
      })
    },
    platform_compatibility_modal () {
      this.$bvToast.toast('Sorry! This app is not compatible with your smartphone.', {
        title: 'Unable to add to locker',
        autoHideDelay: 5000,
        appendToast: true
      })
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
