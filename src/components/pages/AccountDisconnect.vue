<template>
  <div>
    <header>
      <div class="title-card">
        <h3>Disconnect</h3>
      </div>
    </header>
    <main class="apps container text-center">
      <div v-show="!this.accountInformation.loggedIn || this.disconnected">
        <p>
          You are disconnected!
        </p>
      </div>
      <div v-show="this.accountInformation.loggedIn && !this.disconnected">
        <p>
          Are you sure you want to disconnect?
        </p>
        <input type=button v-on:click="disconnect()" value="Disconnect" />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'accountDisconnect',
  components: {
  },
  props: {
    accountInformation: {
      loggedIn: false,
      name: 'Guest'
    }
  },
  data: function () {
    return {
      disconnected: false
    }
  },
  methods: {
    disconnect: function () {
      window.localStorage.removeItem('accessToken')
      window.localStorage.removeItem('authProvider')
      this.disconnected = true
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
</style>
