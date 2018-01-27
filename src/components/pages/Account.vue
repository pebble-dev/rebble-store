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
                <input type="submit" value="Update information" v-bind:disabled="updating" />
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
    accountInformation: {
      loggedIn: false,
      name: 'Guest'
    }
  },
  data: function () {
    return {
      name: '',
      updateNameErrorMessage: '',
      updating: false,
      updateNameSuccess: false
    }
  },
  methods: {
    updateName: function () {
      this.updating = true
      this.updateNameErrorMessage = ''

      var data = JSON.stringify({
        sessionKey: window.localStorage.getItem('sessionKey'),
        name: this.name
      })

      var that = this
      window.$.post(this.backendUrl + '/user/update/name', data, function (data) {
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
