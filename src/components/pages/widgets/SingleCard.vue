<template>
  <a href="#/app-details">
  <div class="card">
    <img class="card-img-top" src="https://assets.getpebble.com/api/file/SAPbwhJzShmep72rvxTQ/convert?cache=true&fit=crop&w=144&h=168" alt="My Watchface">
    <div class="card-block text-xs-center">
      <h4 class="card-title">My Watchface</h4>
      <p class="card-text">
        <small class="text-muted">
          <svg class="svg-icon icon-inverted-thumbs-up" width="16px" height="16px" viewBox="0 0 25 25">
            <use xlink:href="#iconThumbsUp"></use>
          </svg>
          14.5K
        </small>
      </p>
    </div>
  </div>
  </a>
</template>

<script>
export default {
  name: 'single-card'
}
</script>

<style lang="scss" scoped>
@import './static/css/_variables.scss';
    a {

        // Remove text decoration that comes from having the .card inside a "a"
        color: #373a3c;
        text-decoration: none;
        &:hover, &:focus {
            color: #373a3c;
            outline: none;
            text-decoration: none;
        }
        @media screen and (max-width: map-get($grid-breakpoints, lg)) {
          &:last-child, &:nth-last-child(2) {
            display: none;
          }
        }

        .card {
            max-width: 170px;

            // Make it smaller on small screens
            @media screen and (max-width: map-get($grid-breakpoints, sm)) {
                max-width: 32vw;
                display: inline-block;
                margin-bottom: .75rem;

                .card-block {
                    padding-left: 0.2rem;
                    padding-right: 0.2rem;
                }
                .card-title {
                    font-size: 16px;
                }
            }

            // Make the app-screenshot take full-width
            // TODO: decide what to do with app icons
            img {
                width:100%;
                height:auto;
            }
        }
    }
</style>
