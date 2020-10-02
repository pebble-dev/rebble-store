import store from '../store'
import router from '../router'

class NativeService {
  constructor () {
    this.callbacks = []
    this.callbackId = 0
    this.methods = ['setNavBarTitle', 'openURL', 'addToLocker', 'loadAppToDeviceAndLocker', 'promptUserForAddToLockerOrLoad', 'getAppsFromLocker', 'removeFromLocker', 'isAppInLocker', 'unloadAppFromPebble', 'getLoadedAppsFromPebble', 'tryWatchface', 'isConnected', 'closeScreen', 'skipStep', 'bulkLoadAndClose', 'setVisibleApp', 'refreshAccessToken']
    window.PebbleBridge = this
  }

  send (methodName, args, responseCallback, sendCallback) {
    window.setTimeout(() => {
      if (typeof methodName !== 'string') return this._sendError('Native: methodName is not an object', sendCallback)
      if (!~this.methods.indexOf(methodName)) return this._sendError(`Native: ${methodName} is not in list of known methods`, sendCallback)
      if (typeof args !== 'object') return this._sendError('Native: args is not an object', sendCallback)
      // if (config.IS_BROWSER) return void $log.debug('Native: ' + methodName + ' not available in browser');
      var _callbackId = -1
      if (typeof responseCallback === 'function') {
        this.callbacks.push(responseCallback)
        _callbackId = this.callbackId
        this.callbackId = this.callbackId + 1
      } else {
        responseCallback && this._sendError('Native: callback is not a function')
      }
      var uri = this._buildURI(methodName, _callbackId, args)
      this._executeSend(uri)
      if (typeof sendCallback === 'function') {
        sendCallback(null, uri)
      }
    })
  }

  _executeSend (uri) {
    let iframe = document.createElement('iframe')
    iframe.setAttribute('src', uri)
    iframe.setAttribute('height', '1px')
    iframe.setAttribute('width', '1px')
    document.documentElement.appendChild(iframe)
    iframe.parentNode.removeChild(iframe)
    iframe = null
  }

  _sendError (err, callback) {
    console.error(err)
    callback(err)
  }

  _buildURI (methodName, callbackId, args) {
    const msg = this._encodeMsg(methodName, callbackId, args)
    const protocol = 'pebble-method-call-js-frame://'
    const queryCharacter = store.state.userParameters.platform === 'ios' ? '?' : ''
    const uri = protocol + queryCharacter + 'method=' + methodName + '&args=' + msg
    return uri
  }

  _encodeMsg (methodName, callbackId, args) {
    let msgStringified
    const msg = {
      methodName: methodName,
      callbackId: callbackId,
      data: args
    }
    try {
      msgStringified = JSON.stringify(msg)
    } catch (e) {
      return console.error('Native: msg cannot be JSON encoded', e)
    }
    let msgURIEncoded
    try {
      msgURIEncoded = encodeURIComponent(msgStringified)
    } catch (e) {
      return console.error('Native: msg cannot be URI encoded', e)
    }
    return msgURIEncoded
  }

  handleResponse (args) {
    if (typeof args !== 'object' && args !== null) return console.error('Native: args.methodName is not an object')
    if (typeof args.data !== 'object') return console.error('Native: args.data is not an object')
    if (typeof args.callbackId !== 'number') return console.error('Native: args.callbackId is not a number')
    if (args.callbackId < 0) return
    const callback = this.callbacks[args.callbackId]
    delete this.callbacks[args.callbackId]
    if (callback && typeof callback === 'function') {
      callback(args.data)
    } else {
      console.error('Native: callback is not a function', callback)
    }
  }

  _reload () {
    window.location.reload(true)
  }

  handleRequest (args) {
    if (typeof args !== 'object') return console.error('Native: args.methodName is not an object')
    if (typeof args.methodName !== 'string') return console.error('Native: args.methodName is not an object')
    switch (args.methodName) {
      case 'search': {
        // let section = args.section || Storage.get('activeSection') || 'watchapps'
        // let query = args.query || (Storage.get('searchData-' + section) || {}).query || ''
        const section = args.section || 'apps'
        const query = args.query || ''
        const isNative = !(!args.query && !args.section)
        const url = `/${section}/search?page=1&query=${encodeURIComponent(query)}${(isNative ? '&inApp=true' : '')}`
        router.push(url)
        break
      }
      case 'navigate':
        router.push(args.url || '/')
        break
      case 'refresh':
        this._reload()
    }
  }
}

export const Native = new NativeService()
