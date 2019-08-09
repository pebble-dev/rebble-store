import { Native } from '../services'
import { hardwareEnum } from '../store/userParameters'

const mixins = {
  buildResourceUrl (resource) {
    return `${this.$store.state.config.backendUrl}/${resource}?platform=${this.$store.state.userParameters.platform}${this.$store.state.userParameters.hardware !== hardwareEnum.all ? `&hardware=${this.$store.state.userParameters.hardware}&filter_hardware=true` : ''}`
  },
  setTitle (title = '') {
    document.title = title === '' ? 'Rebble Store' : `${title} | Rebble Store`
    if (this.$store.state.userParameters.inApp === true) {
      Native.send('setNavBarTitle', { title: title })
    }
  },
  openExternal (url) {
    if (this.$store.state.userParameters.inApp === true) {
      Native.send('openURL', {
        url: url
      })
    } else {
      window.open(url, '_blank')
    }
  }
}
export default mixins
