<template>
  <div>
    <header>
      <div class="title-card">
        <h3>Login</h3>
      </div>
    </header>
    <main class="apps container text-center">
      <div v-show="this.accountInformation.loggedIn">
        <p>
          You are logged in.
        </p>
      </div>
      <div v-show="!this.accountInformation.loggedIn">
        Please complete this form to login.<br />
        Want to <a href="/user/register">register</a> instead?
        <form v-on:submit.prevent="login">
          <table>
            <tr>
              <td><label for="username">Username</label></td>
              <td><input type="text" id="username" v-model="username" placeholder="Username" required /></td>
            </tr>
            <tr>
              <td><label for="password">Password</label></td>
              <td><input type="password" id="password" v-model="password" placeholder="Password" required /></td>
            </tr>
            <tr>
              <td v-show="rateLimited" max-width="5em;">
                <vue-recaptcha ref="recaptcha" v-on:verify="onVerify" v-on:expired="onExpired" sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI">
                </vue-recaptcha>
              </td>
              <td>
                <input type="submit" value="Login" v-bind:disabled="(rateLimited && captchaResponse === '') || !validUsername || !validPassword || logingIn" />
              </td>
            </tr>
          </table>
        </form>

        <ul class="errors">
          <li class="importantError" v-show="loginErrorMessage !== ''">{{ loginErrorMessage }}</li>
          <li v-show="username === ''">Username required</li>
          <li v-show="username !== '' && !validUsername">Invalid username</li>
          <li v-show="password === ''">Password required</li>
          <li v-show="rateLimited && captchaResponse === ''">Please complete the captcha</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'

var _zxcvbn = require('zxcvbn')

export default {
  name: 'search',
  components: {
    VueRecaptcha
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
      username: '',
      password: '',
      captchaResponse: '',
      loginErrorMessage: '',
      rateLimited: false,
      logingIn: false
    }
  },
  methods: {
    onVerify: function (r) {
      this.captchaResponse = r
    },
    onExpired: function () {
      this.captchaResponse = ''
    },
    login: function () {
      if (!this.validUsername || !this.validPassword || (this.rateLimited && this.captchaResponse === '')) {
        return
      }

      this.logingIn = true
      this.loginErrorMessage = ''

      var data = JSON.stringify({
        username: this.username,
        password: this.password,
        captchaResponse: this.captchaResponse
      })

      var that = this
      window.$.post(this.backendUrl + '/user/login', data, function (data) {
        that.logingIn = false
        if (typeof data !== 'object') {
          that.loginError('Internal server error')
        } else {
          if (data.success) {
            window.localStorage.setItem('sessionKey', data.sessionKey)
            that.accountInformation = {
              loggedIn: true,
              displayName: (data.displayName === '' ? data.username : data.realName),
              username: data.username,
              realName: data.realName
            }
          } else {
            that.loginError(data.errorMessage)
            if (data.rateLimited) {
              that.rateLimited = true
            }
          }
        }
      })
    },
    loginError: function (message) {
      this.loginErrorMessage = message
      this.captchaResponse = ''
      this.$refs.recaptcha.reset()
    }
  },
  computed: {
    validUsername: function () {
      if (this.username.length > 3 && /^[A-Za-z0-9_]+$/.test(this.username)) {
        return true
      } else {
        return false
      }
    },
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
  }
}
</script>

<style lang="scss" scoped>
  table {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 25px;
  }

  vue-recaptcha {
    margin-left: auto;
    margin-right: auto;
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
</style>
