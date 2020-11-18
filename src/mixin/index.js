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
  },
  formatDate (d) {
    const date = new Date(d)
    if (date) {
      return date.getFullYear() + '-' + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + (date.getDate() >= 10 ? date.getDate() : ('0' + date.getDate()))
    }
  },
  capitalize (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  },
  readable_name (value) {
    if (!value) return ''
    value = value.toString()
    return value[0].toUpperCase() + value.replace(new RegExp('-', 'g'), ' ').substring(1)
  }
}
export default mixins
