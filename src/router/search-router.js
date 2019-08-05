import vueRouter from './index'

export const searchRouting = {
  router: {
    read () {
      return vueRouter.currentRoute.query
    },
    write (routeState) {
      vueRouter.push({
        query: routeState
      })
    },
    createURL (routeState) {
      return vueRouter.resolve({
        query: routeState
      }).href
    },
    onUpdate (cb) {
      this._onPopState = ({state}) => {
        const routeState = state
        // at initial load, the state is read from the URL without
        // update. Therefore the state object is not there. In this
        // case we fallback and read the URL.
        if (!routeState) {
          cb(this.read())
        } else {
          cb(routeState)
        }
      }
      window.addEventListener('popstate', this._onPopState)
    },
    dispose () {
      window.removeEventListener('popstate', this._onPopState)
      this.write()
    }
  }
}
