import store from '../store'

class NativeService {
  constructor () {
    this.callbacks = []
    this.callbackId = 0
    this.methods = ['setNavBarTitle', 'openURL', 'addToLocker', 'loadAppToDeviceAndLocker', 'promptUserForAddToLockerOrLoad', 'getAppsFromLocker', 'removeFromLocker', 'isAppInLocker', 'unloadAppFromPebble', 'getLoadedAppsFromPebble', 'tryWatchface', 'isConnected', 'closeScreen', 'skipStep', 'bulkLoadAndClose', 'setVisibleApp', 'refreshAccessToken']
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
    console.log(store.state)
    let msg = this._encodeMsg(methodName, callbackId, args)
    let protocol = 'pebble-method-call-js-frame://'
    let queryCharacter = store.state.storeParameters.platform === 'ios' ? '?' : ''
    let uri = protocol + queryCharacter + 'method=' + methodName + '&args=' + msg
    return uri
  }

  _encodeMsg (methodName, callbackId, args) {
    let msgStringified
    let msg = {
      methodName: methodName,
      callbackId: callbackId,
      data: args
    }
    try {
      msgStringified = JSON.stringify(msg)
    } catch (e) {
      return void console.error('Native: msg cannot be JSON encoded', e)
    }
    let msgURIEncoded
    try {
      msgURIEncoded = encodeURIComponent(msgStringified)
    } catch (e) {
      return void console.error('Native: msg cannot be URI encoded', e)
    }
    return msgURIEncoded
  }
}

export const Native = new NativeService()
