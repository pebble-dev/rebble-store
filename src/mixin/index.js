import { Native } from '../services'

const mixins = {
  buildResourceUrl (resource) {
    return `${this.$store.state.backendUrl}/${resource}?platform=${this.$store.state.storeParameters.platform}&hardware=${this.$store.state.storeParameters.hardware}&filter_hardware=true`
  },
  setTitle (title = '') {
    document.title = title === '' ? 'Rebble Store' : `${title} | Rebble Store`
    if (this.$store.state.inApp === true) {
      Native.send('setNavBarTitle', { title: title })
    }
  },
  openExternal (url) {
    if (this.$store.state.inApp === true) {
      Native.send('openURL', {
        url: url
      })
    } else {
      window.open(url, '_blank')
    }
  }
}
export default mixins
