<template>
  <div>
    <header>
      <div class="title-card">
        <h3>Account details</h3>
      </div>
    </header>
    <main class="apps container text-center">
      <div v-show="!this.accountInformation.loggedIn">
        You are disconnected. <a href="/user/login">Login</a>?
      </div>
      <div v-show="this.accountInformation.loggedIn">
        <p>
          <a href="/user/disconnect">Disconnect</a>
        </p>

        <form v-on:submit.prevent="updateName">
          <table>
            <tr>
              <td><label for="name">Name</label></td>
              <td><input type="text" id="name" v-model="name" placeholder="John Smith" /></td>
            </tr>
            <tr>
              <td>
                <input type="submit" value="Update information" v-bind:disabled="updating || name === ''" />
              </td>
              <td class="success" v-show="updateNameSuccess">
                Success!
              </td>
            </tr>
          </table>
        </form>

        <ul class="errors">
          <li class="importantError" v-show="updateNameErrorMessage !== ''">{{ updateNameErrorMessage }}</li>
        </ul>

        <form method="GET" v-bind:action="authUrl + '/authorize'">
          <table>
            <tr>
              <td>
                <input type="hidden" name="addProvider" />
                <input type="hidden" name="access_token" v-bind:value="accessToken" />
                <input type="hidden" name="state" v-bind:value="state" />
                <input type="hidden" name="redirect_uri" v-bind:value="addProviderCallback" />
                <input type="submit" value="Link another identity provider to your account" v-bind:disabled="updating" />
              </td>
              <td class="success" v-show="addProviderSuccess">
                Success!
              </td>
            </tr>
          </table>
        </form>

        <ul class="errors">
          <li class="importantError" v-show="addProviderErrorMessage !== ''">{{ addProviderErrorMessage }}</li>
        </ul>

      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'account',
  components: {
  },
  props: {
    backendUrl: '',
    authUrl: '',
    addProviderCallback: '',
    accountInformation: {
      loggedIn: false,
      name: 'Guest'
    }
  },
  data: function () {
    return {
      name: '',
      updateNameErrorMessage: '',
      addProviderErrorMessage: '',
      updating: false,
      updateNameSuccess: false,
      addProviderSuccess: false,
      accessToken: undefined,
      state: undefined
    }
  },
  methods: {
    updateName: function () {
      this.updating = true
      this.updateNameErrorMessage = ''

      var data = JSON.stringify({
        accessToken: window.localStorage.getItem('accessToken'),
        name: this.name
      })

      var that = this
      window.$.post(this.authUrl + '/user/update/name', data, function (data) {
        that.updating = false
        if (typeof data !== 'object') {
          that.updatePasswordErrorMessage = 'Internal Server Error'
        } else {
          if (data.success) {
            that.updateNameSuccess = true
            that.name = ''
          } else {
            that.updateNameErrorMessage = data.errorMessage
          }
        }
      })
    },
    updateDataWhenAvailable: function () {
      if (this.accountInformation.loggedIn === false) {
        window.setTimeout(this.updateDataWhenAvailable, 200)
      } else {
        this.name = this.accountInformation.name
      }
    }
  },
  mounted: function () {
    this.updateDataWhenAvailable()
    this.accessToken = window.localStorage.getItem('accessToken')

    if (window.localStorage.getItem('state') === null) {
      window.localStorage.setItem('state', this.genRandomString())
    }
    this.state = window.localStorage.getItem('state')

    if (this.$route.query.success !== undefined || this.$route.query.error !== undefined) {
      if (this.$route.query.success !== undefined) {
        this.addProviderSuccess = true
      }
      if (this.$route.query.error !== undefined) {
        this.addProviderErrorMessage = 'Error: ' + this.$route.query.error
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  table {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 25px;
  }

  td {
    padding: 5px;
  }

  .errors {
    color: red;
  }

  .importantError {
    font-weight: bold;
  }

  .success {
    color: green;
  }
</style>
