<template>
  <div>
    <main class="container text-xs-center">
      <section>
        <div class="page-error page-error--404">

          <h2>Our pet rock has lost your page, sorry about that</h2>

          <svg class="pet-rock-pebble" width="406" height="201" viewBox="0 0 406 201">
              <g fill="none" fill-rule="evenodd" transform="translate(2 2)">
                <polygon fill="#D8D8D8" stroke="#373A3C" stroke-width="4" points="131.999 196.638 216.6 196.071 237.338 165.014 230.162 125.311 201.731 103.267 177.694 75.611 137.498 61.394 87.765 63.716 57.078 58.349 27.154 69.348 .545 104.406 15.774 147.016 73.715 179.99"/>
                <polyline stroke="#373A3C" stroke-width="2" points="237.049 166.139 208.87 183.73 134.959 181.099 79.012 166.139 27.964 139.016 2.519 105.431"/>
                <g transform="translate(159 127)">
                  <circle cx="13.5" cy="13.5" r="13.5" fill="#FFFFFF" stroke="#373A3C" stroke-width="2" transform="matrix(-1 0 0 1 27 0)"/>
                  <circle cx="16.5" cy="17.5" r="9.5" fill="#373A3C" stroke="#373A3C" stroke-width="2" transform="matrix(-1 0 0 1 33 0)"/>
                  <circle cx="11" cy="16" r="2" fill="#FFFFFF" transform="matrix(-1 0 0 1 22 0)"/>
                </g>
                <g transform="translate(211 115)">
                  <circle cx="13.5" cy="13.5" r="13.5" fill="#FFFFFF" stroke="#373A3C" stroke-width="2" transform="matrix(-1 0 0 1 27 0)"/>
                  <circle cx="15.5" cy="16.5" r="9.5" fill="#373A3C" stroke="#373A3C" stroke-width="2" transform="matrix(-1 0 0 1 31 0)"/>
                  <circle cx="11" cy="15" r="2" fill="#FFFFFF" transform="matrix(-1 0 0 1 22 0)"/>
                </g>
                <g transform="translate(256)">
                  <polygon fill="#FFFFFF" stroke="#373A3C" stroke-width="4" points="25.576 0 120.886 0 146 22.464 146 91.623 120.886 111.304 37.5 111.304 11.089 128 11.089 100.5 0 91.623 0 22.464"/>
                  <text fill="#000000" transform="translate(36 24)" font-size="44" font-family="OpenSans-Light, Open Sans" font-weight="300">
                    <tspan x="0" y="47">404</tspan>
                  </text>
                </g>
              </g>
            </svg>

          <h4>We're getting the following message {{ 404 }}</h4>
          <div class="page-error_buttons">
            <button v-on:click="reload()" class="btn btn-outline-secondary">Try again</button>
            <router-link v-bind:to="'/'  + urlArguments" class="btn btn-outline-pebble">Back to home</router-link>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'error',
  props: {
    platform: ''
  },
  data: function () {
    return {
      reload () {
        this.$router.go(0)
      },
      'urlArguments': ''
    }
  },
  beforeMount: function () {
    // Set url arguments if exist
    this.platform ? (this.urlArguments = '?platform=' + this.platform) : ''
  }
}
</script>

<style lang="scss" scoped>
@import './static/css/_variables.scss';

// _error.scss
// Error page styles

.page-error {
  // Calculate top margin 58 px ar of the navbar
  margin-top: 40px + 58px;
  min-height: 400px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;

  h4 {
    // Change font to make this page more interesting
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
  }

  .pet-rock-pebble {
      // Mascot svg
      margin-top: 3rem;
      margin-bottom: 3rem;
    }

  .page-error_buttons {
    // Minimal style changes to buttons
    margin-top: 3rem;
    .btn-outline-pebble {
      &:hover {
        color: #f4f3f4;
      }
    }
  }
}

</style>
