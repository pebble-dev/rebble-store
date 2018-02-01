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

      <form method="GET" v-bind:action="authUrl + '/authorize'" v-if="$route.query.code === undefined" >
        <input type="hidden" name="redirect_uri" v-bind:value="loginCallback" />
        <input type="hidden" name="state" v-bind:value="state" />
        <button type="submit">Connect to Rebble</button>
      </form>

      <div v-if="loggedIn">
          Logged in successfully!
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'accountLogin',
  props: {
    backendUrl: '',
    authUrl: '',
    loginCallback: '',
    accountInformation: {
      loggedIn: false,
      name: 'guest'
    }
  },
  data: function () {
    return {
      state: undefined,
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

    genRandomString: function () {
      const charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'
      const o = []

      window.crypto.getRandomValues(new Uint32Array(64)).forEach(c => o.push(charset[c % charset.length]))

      return o.join('')
    }
  },
  mounted: function () {
    if (window.localStorage.getItem('state') === null) {
      window.localStorage.setItem('state', this.genRandomString())
    }
    this.state = window.localStorage.getItem('state')

    if (this.$route.query.error !== undefined) {
      this.error(this.$route.query.error)
    }

    let accessToken = this.$route.query.access_token
    if (accessToken !== undefined) {
      if (this.$route.query.state !== window.localStorage.getItem('state')) {
        this.error('Invalid state! If you legitimately requested a login, please contact a developer.')
      } else {
        window.localStorage.setItem('accessToken', accessToken)
        this.loggedIn = true
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
