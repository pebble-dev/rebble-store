<template>
  <div>
    <header>
      <div class="title-card">
        <h3>Login</h3>
      </div>
    </header>
    <main class="apps container text-center">
      <div class="error" v-if="errors.length !== 0">
        <ul>
          <li v-for="error in errors.list" v-bind:key="error.id" >
            Error: {{ error.value }}
          </li>
        </ul>
      </div>

      <form method="GET" v-bind:action="authProviders.google.discovery.authorization_endpoint" v-if="$route.query.code === undefined" >
        <input type="hidden" name="client_id" v-bind:value="authProviders.google.client_id" />
        <input type="hidden" name="redirect_uri" v-bind:value="authProviders.google.redirect_uri" />
        <input type="hidden" name="response_type" value="code" />
        <input type="hidden" name="scope" v-bind:value="authProviders.google.scopes" />
        <input type="hidden" name="nonce" v-bind:value="nonce" />
        <input type="hidden" name="state" v-bind:value="state" />
        <button type="submit" v-on:click="setAuthProvider('google');">Connect using your Google account</button>
      </form>

      <form method="GET" v-bind:action="authProviders.yahoo.discovery.authorization_endpoint" v-if="$route.query.code === undefined" >
        <input type="hidden" name="client_id" v-bind:value="authProviders.yahoo.client_id" />
        <input type="hidden" name="redirect_uri" v-bind:value="authProviders.yahoo.redirect_uri" />
        <input type="hidden" name="response_type" value="code" />
        <input type="hidden" name="scope" v-bind:value="authProviders.yahoo.scopes" />
        <input type="hidden" name="nonce" v-bind:value="nonce" />
        <input type="hidden" name="state" v-bind:value="state" />
        <button type="submit" v-on:click="setAuthProvider('yahoo');">Connect using your Yahoo account</button>
      </form>

      <form method="GET" v-bind:action="authProviders.auth0.discovery.authorization_endpoint" v-if="$route.query.code === undefined" >
        <input type="hidden" name="client_id" v-bind:value="authProviders.auth0.client_id" />
        <input type="hidden" name="redirect_uri" v-bind:value="authProviders.auth0.redirect_uri" />
        <input type="hidden" name="response_type" value="code" />
        <input type="hidden" name="scope" v-bind:value="authProviders.auth0.scopes" />
        <input type="hidden" name="nonce" v-bind:value="nonce" />
        <input type="hidden" name="state" v-bind:value="state" />
        <button type="submit" v-on:click="setAuthProvider('auth0');">Connect using Auth0</button>
      </form>

      <div v-if="$route.query.code !== undefined">
        <template v-if="loggedIn">
          Logged in successfully!
        </template>
        <template v-else-if="errors.n === 0">
          Logging in...
        </template>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'accountLogin',
  props: {
    backendUrl: '',
    accountInformation: {
      loggedIn: false,
      name: 'guest'
    },
    authProviders: {
      google: {
        name: '',
        scopes: '',
        client_id: '',
        discovery: '',
        redirect_uri: ''
      },
      yahoo: {
        name: '',
        scopes: '',
        client_id: '',
        discovery: '',
        redirect_uri: ''
      },
      auth0: {
        name: '',
        scopes: '',
        client_id: '',
        discovery: '',
        redirect_uri: ''
      }
    }
  },
  data: function () {
    return {
      state: undefined,
      nonce: undefined,
      loggedIn: false,
      errors: {
        n: 0,
        list: []
      }
    }
  },
  methods: {
    error: function (e) {
      this.errors.list.push({
        id: this.errors.n++,
        value: e
      })
      console.log('Error: ' + e)
    },

    setAuthProvider: function (provider) {
      window.localStorage.setItem('authProvider', provider)
    },

    getAuthProvider: function () {
      let provider = window.localStorage.getItem('authProvider')
      if (provider === null) {
        return undefined
      }

      return this.authProviders[provider]
    },

    genRandomString: function () {
      const charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'
      const o = []

      window.crypto.getRandomValues(new Uint32Array(64)).forEach(c => o.push(charset[c % charset.length]))

      return o.join('')
    }
  },
  mounted: function () {
    this.nonce = this.genRandomString()

    if (window.localStorage.getItem('state') === null) {
      window.localStorage.setItem('state', this.genRandomString())
    }
    this.state = window.localStorage.getItem('state')

    if (this.$route.query.error !== undefined) {
      this.error(this.$route.query.error)
    }

    let code = this.$route.query.code
    if (code !== undefined) {
      if (this.$route.query.state !== window.localStorage.getItem('state')) {
        this.error('Invalid state! If you legitimately requested a login, please contact a developer.')
      } else {
        let data = JSON.stringify({
          code: code,
          authProvider: this.getAuthProvider().name
        })

        var that = this
        window.$.post(this.backendUrl + '/user/login', data, function (data) {
          if (typeof data !== 'object') {
            that.error('Received non-object data from SSO provider: ' + data)
            that.validToken = false
            return
          }

          if (!data.success) {
            that.error(data.errorMessage)
          } else {
            window.localStorage.setItem('sessionKey', data.sessionKey)

            that.loggedIn = true
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.error {
  color: red;
}

</style>
