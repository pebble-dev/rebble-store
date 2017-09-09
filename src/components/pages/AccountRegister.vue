<template>
  <div>
    <header>
      <div class="title-card">
        <h3>Register an account</h3>
      </div>
    </header>
    <main class="apps container text-center">
      <div v-show="!registerSuccess">
        <form v-on:submit.prevent="register">
          <table>
            <tr>
              <td><label for="username">Username</label></td>
              <td><input type="text" id="username" v-model="username" placeholder="Username" required /></td>
            </tr>
            <tr>
              <td><label for="password">Password</label></td>
              <td><input type="password" id="password" v-model="password" placeholder="Password" required /></td>
              <td><span v-bind:style="'color: ' + password_color">Time to crack: {{ zxcvbn(password).crack_times_display.online_no_throttling_10_per_second }}</span></td>
            </tr>
            <tr>
              <td><label for="realName">Real Name (optional)</label></td>
              <td><input type="text" id="realName" v-model="realName" placeholder="John Smith" /></td>
            </tr>
            <tr>
              <td>
                <vue-recaptcha ref="recaptcha" v-on:verify="onVerify" v-on:expired="onExpired" sitekey="6LfmYS8UAAAAAI1ecROp0s2Ym_TQq5OgRNLKDKYV">
                </vue-recaptcha>
              </td>
              <td>
                <input type="submit" value="Register" v-bind:disabled="captchaResponse == '' || !validUsername || !validPassword || registering" />
              </td>
            </tr>
          </table>
        </form>

        <ul class="errors">
          <li class="importantError" v-show="registerErrorMessage !== ''">{{ registerErrorMessage }}</li>
          <li v-show="username === ''">Username required</li>
          <li v-show="username !== '' && !validUsername">Invalid username</li>
          <li v-show="password === ''">Password required</li>
          <li v-show="password !== '' && !validPassword && password.length <= 255">Password too simple or too common</li>
          <li v-show="password !== '' && !validPassword && password.length > 255">Password too long (max. 255 characters)</li>
          <li v-show="captchaResponse === ''">Please complete the captcha</li>
        </ul>
      </div>
      <div v-show="registerSuccess">
        <p>
          You have successfully registered your account.
        </p>
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
    backendUrl: ''
  },
  data: function () {
    return {
      username: '',
      password: '',
      realName: '',
      captchaResponse: '',
      registerErrorMessage: '',
      registering: false,
      registerSuccess: false
    }
  },
  methods: {
    onVerify: function (r) {
      this.captchaResponse = r
    },
    onExpired: function () {
      this.captchaResponse = ''
    },
    register: function () {
      if (!this.validUsername || !this.validPassword || this.captchaResponse === '') {
        return
      }

      this.registering = true
      this.registerErrorMessage = ''

      var data = JSON.stringify({
        username: this.username,
        password: this.password,
        realName: this.realName,
        captchaResponse: this.captchaResponse
      })

      var that = this
      window.$.post(this.backendUrl + '/user/register', data, function (data) {
        that.registering = false
        if (typeof data !== 'object') {
          that.registerError('Internal server error')
        } else {
          if (data.success) {
            that.registerSuccess = true
          } else {
            that.registerError(data.errorMessage)
          }
        }
      })
    },
    registerError: function (message) {
      this.registerErrorMessage = message
      this.captchaResponse = ''
      this.$refs.recaptcha.reset()
    },
    zxcvbn: function (password) {
      return _zxcvbn(password)
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
