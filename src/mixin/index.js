export default function buildResourceUrl (resource) {
  return `${this.$store.state.backendUrl}/${resource}?platform=${this.$store.state.storeParameters.platform}&hardware=${this.$store.state.storeParameters.hardware}&filter_hardware=true`
}
