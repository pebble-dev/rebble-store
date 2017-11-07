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

        <form v-on:submit.prevent="updatePassword">
          <table>
            <tr>
              <td><label for="password">New password</label></td>
              <td><input type="password" id="password" v-model="password" placeholder="Password" /></td>
              <td v-show="password !== ''"><span v-bind:style="'color: ' + password_color">Time to crack: {{ zxcvbn(password).crack_times_display.online_no_throttling_10_per_second }}</span></td>
            </tr>
            <tr>
              <td><label for="password">New password verification</label></td>
              <td><input type="password" id="passwordCheck" v-model="passwordCheck" placeholder="Password" /></td>
              <td v-show="password !== passwordCheck" style="color:red">The passwords don't match</td>
            </tr>
            <tr>
              <td>
                <input type="submit" value="Change password" v-bind:disabled="password != passwordCheck || !validPassword || updating" />
              </td>
              <td class="success" v-show="updatePasswordSuccess">
                Success!
              </td>
            </tr>
          </table>
        </form>
        <ul class="errors">
          <li class="importantError" v-show="updatePasswordErrorMessage !== ''">{{ updatePasswordErrorMessage }}</li>
          <li v-show="password !== '' && !validPassword && password.length <= 255">Password too simple or too common</li>
          <li v-show="password !== '' && !validPassword && password.length > 255">Password too long (max. 255 characters)</li>
        </ul>

        <form v-on:submit.prevent="updateRealName">
          <table>
            <tr>
              <td><label for="realName">Real Name (optional)</label></td>
              <td><input type="text" id="realName" v-model="realName" placeholder="John Smith" /></td>
            </tr>
            <tr>
              <td>
                <input type="submit" value="Update information" v-bind:disabled="updating" />
              </td>
              <td class="success" v-show="updateRealNameSuccess">
                Success!
              </td>
            </tr>
          </table>
        </form>
        <ul class="errors">
          <li class="importantError" v-show="updateRealNameErrorMessage !== ''">{{ updateRealNameErrorMessage }}</li>
        </ul>

      </div>
    </main>
  </div>
</template>

<script>
var _zxcvbn = require('zxcvbn')

export default {
  name: 'account',
  components: {
  },
  props: {
    backendUrl: '',
    accountInformation: {
      loggedIn: false,
      displayName: 'Guest',
      username: 'guest',
      realName: 'guest'
    }
  },
  data: function () {
    return {
      password: '',
      passwordCheck: '',
      realName: '',
      updatePasswordErrorMessage: '',
      updateRealNameErrorMessage: '',
      updating: false,
      updatePasswordSuccess: false,
      updateRealNameSuccess: false
    }
  },
  methods: {
    updatePassword: function () {
      if (!this.validPassword === '') {
        return
      }

      this.updating = true
      this.updatePasswordErrorMessage = ''

      var data = JSON.stringify({
        sessionKey: window.localStorage.getItem('sessionKey'),
        password: this.password
      })
      console.log(data)

      var that = this
      window.$.post(this.backendUrl + '/user/update/password', data, function (data) {
        that.updating = false
        if (typeof data !== 'object') {
          that.updatePasswordErrorMessage = 'Internal Server Error'
        } else {
          if (data.success) {
            that.updatePasswordSuccess = true
            that.password = ''
            that.passwordCheck = ''
          } else {
            that.updatePasswordErrorMessage = data.errorMessage
          }
        }
      })
    },
    updateRealName: function () {
      this.updating = true
      this.updateRealNameErrorMessage = ''

      var data = JSON.stringify({
        sessionKey: window.localStorage.getItem('sessionKey'),
        realName: this.realName
      })

      var that = this
      window.$.post(this.backendUrl + '/user/update/realName', data, function (data) {
        that.updating = false
        if (typeof data !== 'object') {
          that.updatePasswordErrorMessage = 'Internal Server Error'
        } else {
          if (data.success) {
            that.updateRealNameSuccess = true
            that.realName = ''
          } else {
            that.updateRealNameErrorMessage = data.errorMessage
          }
        }
      })
    },
    updateDataWhenAvailable: function () {
      if (this.accountInformation.loggedIn === false) {
        window.setTimeout(this.updateDataWhenAvailable, 200)
      } else {
        this.realName = this.accountInformation.realName
      }
    },
    zxcvbn: function (password) {
      return _zxcvbn(password)
    }
  },
  computed: {
    validPassword: function () {
      if (this.password.length > 255) {
        return false
      }

      if (_zxcvbn(this.password).guesses_log10 < 6) {
        return false
      }

      return true
    },
    password_color: function () {
      var guesses = _zxcvbn(this.password).guesses_log10

      return 'rgb(' + Math.pow(2.7, -guesses / 20) * 255 + ', ' + (1 - Math.pow(2.7, -guesses / 20)) * 255 + ', 0)'
    }
  },
  mounted: function () {
    this.updateDataWhenAvailable()
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
