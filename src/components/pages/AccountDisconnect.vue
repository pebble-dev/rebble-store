<template>
  <div>
    <header>
      <div class="title-card">
        <h3>Disconnect</h3>
      </div>
    </header>
    <main class="apps container text-center">
      <div v-show="!this.accountInformation.loggedIn">
        <p>
          You are disconnected!
        </p>
      </div>
      <div v-show="this.accountInformation.loggedIn">
        <p>
          Are you sure you want to disconnect?
        </p>
        <input type=button v-on:click="disconnect()" value="Disconnect" />
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
    accountInformation: {
      loggedIn: false,
      displayName: 'Guest',
      username: 'guest',
      realName: 'guest'
    }
  },
  methods: {
    disconnect: function () {
      window.localStorage.removeItem('sessionKey')
      this.accountInformation = {
        loggedIn: false,
        displayName: 'Guest',
        username: 'guest',
        realName: 'guest'
      }
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
