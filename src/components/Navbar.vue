<template>
    <b-navbar toggleable="true" type="dark" variant="dark" class="translucent" fixed="top">
      <div class="navbar__items left" v-show="showBackButton">
        <b-nav-item class="back" v-on:click="goBack()">
            &#10094;
        </b-nav-item>
      </div>
      <b-navbar-brand to="/">Rebble Store
          <small>
            for&nbsp;
            <div class="pebble">pebble</div>
          </small>
      </b-navbar-brand>
      <div class="navbar__items right">
        <b-navbar-toggle target="categorySelector"></b-navbar-toggle>
        <b-nav-item class="search" to="/faces/search">
          <svg class="icon-search" width="25px" height="25px" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <use xlink:href="#iconSearch"></use>
          </svg>
        </b-nav-item>
        <b-nav-item v-if="$store.state.userParameters.devMode" class="settings" to="/settings">
          <svg class="icon-settings" width="25px" height="25px" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <use xlink:href="#iconSettings"></use>
          </svg>
        </b-nav-item>
      </div>
      <b-collapse id="categorySelector" class="text-center" v-model="showCollapse" is-nav>
        <div class="text-muted category-container">
          <div class="btn-group btn-group-lg" role="group">
            <router-link to="/" v-bind:class="{ active: currentRoute == '/faces'}" class="btn btn-outline-secondary btn-watchface" role="button">
              <svg class="icon-watchface" width="25px" height="25px" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <use xlink:href="#iconWatchface"></use>
              </svg>
              Watchfaces
            </router-link>

            <router-link to="/apps" v-bind:class="{ active: currentRoute == '/apps'}" class="btn btn-outline-secondary btn-app" role="button">
              <svg class="icon-app" width="25px" height="25px" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <use xlink:href="#iconApp"></use>
              </svg>
              Apps
            </router-link>
          </div>
        </div>
      </b-collapse>
    </b-navbar>
</template>

<script>
export default {
  name: 'navbar',

  data () {
    return {
      showBackButton: false,
      currentRoute: '/',
      goBack () {
        this.$router.go(-1)
      },
      showCollapse: false
    }
  },

  mounted () {
    // Update the route state on page load, in case we didn't start at home
    this.currentRoute = (this.$route.path === '' ? '/' : this.$route.path)
    this.updateBackButton()
  },

  watch: {
    '$route' (to, from) {
      // Ternary operation makes sure the path is never an empty string when we go home
      // This is for the class binding on the watchfaces button,
      // since that is currently the home route
      this.currentRoute = (this.$route.path === '' ? '/' : this.$route.path)
      this.updateBackButton()
      this.showCollapse = false
    }
  },

  methods: {
    updateBackButton () {
      this.showBackButton = (this.currentRoute !== '/faces' && this.currentRoute !== '/apps')
    }
  }
}
</script>

<style lang="scss" scoped>
// Select the dark translucent navbar
.navbar-dark.bg-dark.translucent {
  // Fix navbar being smaller than 58px
  min-height: 42px;
  width: 100%;

    // Navbar brand (app logo or title) styles
    .navbar-brand {
        display: initial;
        margin: 0;
        position: relative;
        top: 2px;
        @media screen and (min-width: 768px) {
          margin-right: auto;
          margin-left: auto;
        }

        // Make text smaller on small screens
        @media screen and (max-width: 430px) {
            margin-left: -10px;
            top: 2px;
            font-size: 1rem;
        }
    }

    li.nav-item {
      a {
        padding: 0 2px;
      }
    }

    // Navbar items right container
    .navbar__items {

        // Items in the right
        &.right {
          @media screen and (max-width: 767px) {
            margin-left: auto;
          }

          // Search Icon
          .search a {
            padding-top: 2px; // Move it down
          }

          // Hamburger icon
          .navbar-toggler {
            cursor: pointer;
            padding: .25rem .35rem;
            margin-right: .25rem;
          }
        }

        // Items in the left
        &.left {
          left: 16px;

          // Prevent brand from going on top of this
          @media screen and (max-width: map-get($grid-breakpoints, sm)) {
            position: static;
          }

          // Back arrow button
          li.back a {
            position: relative;
            top: 2px;
            font-size: 27px;
            color: rgba(255, 255, 255, 0.5);
            background: none;
            border: none;
            cursor: pointer;
            // Add margin on breakpoint to prevent brand from being really close
            margin-right: 20px;

          }

        }

        // Hamburger icon
        .navbar-toggler, .navbar-toggler:focus {
            border: 0;
            border-radius: 0;
            outline: none;
        }

        > * {
            display: inline-block;
            vertical-align: middle;
        }
    }

    @supports (not (backdrop-filter: blur(10px))) and (not (-webkit-backdrop-filter: blur(10px))) {
      // Only if doesn't supports backdrop filters
      background-color: rgb(55, 58, 60) !important;

    }

    @supports (backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px)) {
        // Styles that are in here will only apply if backdrop filters are supported by the browser
         background-color: rgba(55, 58, 60, 0.96)!important;

         // Make the navbar background blurry
         backdrop-filter: blur(10px);
    }
}

// Collapsable menu (this may change in the future) in which you select to browse watchfaces or apps
#categorySelector {
    width: 100vw;
    margin-left: -16px;
    margin-right: -16px;
    .category-container {
      padding: 0.25rem;
      padding-top: calc(0.25rem + 10px);
    }

    // Change default button group styles to ones that match the style
    .btn-group {
        .btn-outline-secondary {
            border-color: rgba(204, 204, 204, 0.50);
            color: rgba(204, 204, 204, 0.50);
            &.active, &:active,  &:hover {
                color: #fff;
                background-color: rgba(204, 204, 204, 0.50);

                // Overwrite bootstrap style
                border-color: rgba(204, 204, 204, 0.50);
            }
            &:focus, &.focus {
                // Overwrite bootstrap style
                border-color: rgba(204, 204, 204, 0.50);
            }
        }

    }
}
</style>
