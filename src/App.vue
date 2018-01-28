<template>
  <div id="app">
    <div class="flex-content">
      <svg-container></svg-container>
      <navbar v-bind:backendUrl="backendUrl" v-bind:accountInformation="accountInformation"></navbar>
      <router-view v-bind:backendUrl="backendUrl" v-bind:accountInformation="accountInformation" v-bind:authProviders="authProviders"></router-view>
    </div>
    <page-footer></page-footer>
  </div>
</template>

<script>
import SvgContainer from './components/SvgContainer'
import Home from './components/Home'
import Navbar from './components/Navbar'
import PageFooter from './components/PageFooter'

export default {
  name: 'app',
  components: {
    SvgContainer,
    Navbar,
    Home,
    PageFooter
  },
  data: function () {
    return {
      backendUrl: 'https://localhost:8080',
      authProvider: window.localStorage.getItem('authProvider'),
      accountInformation: {
        loggedIn: false,
        name: 'Guest'
      },
      authProviders: {
        google: {
          name: 'google',
          scopes: 'profile email',
          client_id: '', // Insert client ID here
          discovery: {},
          redirect_uri: 'http://localhost:8081/user/login' // Change for production
        },
        yahoo: {
          name: 'yahoo',
          scopes: 'openid sdps-r',
          client_id: '', // Insert client ID here
          discovery: {},
          redirect_uri: 'http://example.com/user/login' // It is impossible to redirect to add a `localhost` callback URI when creating a yahoo app... Workaround is to copy the url manually while changing the domain
        },
        auth0: {
          name: 'auth0',
          scopes: 'openid profile email',
          client_id: '',
          discovery: {},
          redirect_uri: 'http://localhost:8081/user/login'
        }
      }
    }
  },
  methods: {
    getAccountInformation: function () {
      if (window.localStorage.getItem('sessionKey') !== null) {
        var that = this

        var data = JSON.stringify({
          sessionKey: window.localStorage.getItem('sessionKey')
        })

        window.$.post(this.backendUrl + '/user/info', data, function (data) {
          if (typeof data !== 'object') {
            console.log('Got non-JSON object from {backend}/usr/info: ' + data)
          } else {
            if (data.loggedIn) {
              that.accountInformation.loggedIn = true
              that.accountInformation.name = data.name
            } else {
              window.localStorage.removeItem('sessionKey')
              that.sessionKey = null
            }
          }
        })
      }
    },
    authProvidersDiscovery: function () {
      var that = this
      window.$.get('https://accounts.google.com/.well-known/openid-configuration', function (data) {
        if (typeof data !== 'object') {
          console.log('Received non-object data: ' + data)
          return
        }

        that.authProviders.google.discovery = data
      })
      window.$.get('https://rebbletest-localhost.auth0.com/.well-known/openid-configuration', function (data) {
        if (typeof data !== 'object') {
          console.log('Received non-object data: ' + data)
          return
        }

        that.authProviders.auth0.discovery = data
      })

      // Yahoo does not set any CORS headers, so the discovery isn't doable from a Web Browser. What the f*ck, yahoo?
      that.authProviders.yahoo.discovery = {
        issuer: 'https://api.login.yahoo.com',
        authorization_endpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
        token_endpoint: 'https://api.login.yahoo.com/oauth2/get_token',
        token_revocation_endpoint: 'https://api.login.yahoo.com/oauth2/revoke',
        jwks_uri: 'https://api.login.yahoo.com/openid/v1/certs',
        response_types_supported: [
          'code',
          'token',
          'id_token',
          'code token',
          'code id_token',
          'token id_token',
          'code token id_token'
        ],
        subject_types_supported: [
          'public'
        ],
        id_token_signing_alg_values_supported: [
          'ES256',
          'RS256'
        ],
        scopes_supported: [
          'openid'
        ],
        token_endpoint_auth_methods_supported: [
          'client_secret_basic',
          'client_secret_post'
        ],
        claims_supported: [
          'aud',
          'email',
          'email_verified',
          'birthdate',
          'exp',
          'family_name',
          'given_name',
          'iat',
          'iss',
          'locale',
          'name',
          'sub',
          'auth_time'
        ]
      }
    }
  },
  beforeMount: function () {
    this.authProvidersDiscovery()
    this.getAccountInformation()
  }
}
</script>

<style lang="scss">
@import './static/css/_variables.scss';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
// _fonts.scss
// Set font-family and font-weight in here

// Open Sans 300 for titles and 400 for small titles
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,400i');

//Raleway 400, 400i, 700, 700i for all of the other text
@import url('https://fonts.googleapis.com/css?family=Raleway:400,400i,700,700i');

body {
  font-family: 'Raleway', sans-serif;
}

h1, h2, h3, h4, h5, h6, small {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
}

p {
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
}
b {
    font-weight: 700;
}

.btn {
  // Remove transitions from .btn
  transition: none;
  &:focus {
    box-shadow: none;
  }
}

body {
  background-color: $main-bg-color;

  // Make footer sticky
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  .flex-content {
    flex: 1;
  }
  // App columns container
  .apps{
    margin-top: 40px;
  }
}

.pull-right {
    float: right;
}

// Pebble color helper class
.pebble {
  color: $pebble-color !important;
  display: inline;
}
a {
  .badge-pebble {
    color: #fff;
  }
}

// Pebble colored badge
.badge-pebble {
    background-color: $pebble-color;
    //color: #333;
}

// Pebble color outline button
.btn-outline-pebble {
    margin-left: 10px;
    color: $pebble-color;
    border-color: $pebble-color;
    background-image: none;
    background-color: transparent;

    // Pebble button button hover styles
    &:hover {
        background-color: $pebble-color;
        color: #333;
    }

    &:focus {
      // Override some bootstrap styles
      color: $pebble-color;
    }
}

  // Add new card style called subsection with inverse color (reusable component)
  .card.subsection {
    max-width: 720px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 0;
    margin-bottom: 40px;
    display: block;
  }
  .card.subsection-inverse {
    @extend .card.subsection;
    background-color: #333;
    border-color: #333;
 }

// Modify default pagination styles, mostly color (not inside section because it may get reused)
ul.pagination {
  display: inline-flex;
    .page-item {
        &.active .page-link {
            // Button is active
            background: $pebble-color;
            border-color: $pebble-color;
            color: #fff;
        }
        &.disabled .page-link {
            // Button is disabled
            color: #818a91;
        }
         .page-link {
            // Change text colot
            color: $pebble-color;
            cursor: pointer;
            &:hover, &:focus  {
                // Overwrite hover and focus states
                text-decoration: none;
                outline: none;
            }
        }
    }
}

header {
  padding-top: 58px;
  background: linear-gradient(to bottom, rgba(55, 58, 60, 1) 0%, rgba(55, 58, 60, 1) 65%, rgba(55, 58, 60, 0) 65%, rgba(55, 58, 60, 0) 100%);
  .title-card {
    width: 90vw;
    padding: 20px;
    background-color: #fff;
    max-width: 720px;
    max-height: 320px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
    h3 {
      margin: 0;
    }
  }
}
</style>
