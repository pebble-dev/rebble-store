<template>
  <nav class="navbar navbar-fixed-top navbar-dark bg-inverse text-sm-center translucent">
    <div class="navbar-container">
      <div class="navbar__items left">
        <a class="float-xs-left back" href="app-details.html"><i class="fa fa-angle-left" aria-hidden="true"></i></a>
      </div>
      <a class="navbar-brand" href="/">
        Rebble Store
        <small>
          for&nbsp;
          <div class="pebble">pebble</div>
        </small>
      </a>
      <div class="navbar__items right">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#categorySelector" aria-controls="categorySelector" aria-expanded="false" aria-label="Toggle navigation"></button>
        <a class="search" href="#/search">
          <svg class="icon-search" width="25px" height="25px" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <use xlink:href="#iconSearch"></use>
          </svg>
        </a>
      </div>
    </div>
    <div class="collapse text-xs-center" id="categorySelector">
      <div class="text-muted p-1">
        <div class="btn-group btn-group-lg" role="group">
          <a href="/" class="btn btn-outline-secondary active btn-watchface" role="button">
            <svg class="icon-watchface" width="25px" height="25px" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href="#iconWatchface"></use>
            </svg>
            Watchfaces
          </a>

          <a href="#/apps" class="btn btn-outline-secondary btn-app" role="button">
            <svg class="icon-app" width="25px" height="25px" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href="#iconApp"></use>
            </svg>
            Apps
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style lang="scss" scoped>
@import './static/css/_variables.scss';


.navbar-dark.bg-inverse.translucent {
    .navbar-brand {

    }
}

// Select the dark translucent navbar
.navbar-dark.bg-inverse.translucent {
  .navbar-container {
    // Fix navbar being smaller than 58px
    min-height: 42px;

      // Navbar brand (app logo or title) styles
      .navbar-brand {
          float: none;
          margin: 0;
          position: relative;
          top: 5px;

          // Make text smaller on small screens
          @media screen and (max-width: 370px) {
            margin-left: -10px;
              top: 9px;
              font-size: 1rem;
          }
      }

      // Navbar items right container
      .navbar__items {
          position: absolute;

          // Items in the right
          &.right {
            right: 16px;
          }

          // Items in the left
          &.left {
            left: 16px;

            // Prevent brand from going on top of this
            @media screen and (max-width: map-get($grid-breakpoints, sm)) {
              position: static;
            }

            // Back arrow button
            a.back {
                font-size: 27px;
                color: #a5a6a7;

                // Add margin on breakpoint to prevent brand from being really close
                @media screen and (max-width: map-get($grid-breakpoints, sm)) {
                  margin-right: 20px;
                }

            }

          }

          top: 8px;

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

    }
    background-color: rgba(55, 58, 60, 0.95)!important;


    @supports (backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px)) {
        // Styles that are in here will only apply if backdrop filters are supported by the browser
         background-color: rgba(55, 58, 60, 0.88)!important;

         // Make the navbar background blurry
         backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }
}

// Collapsable menu (this may change in the future) in which you select to browse watchfaces or apps
#categorySelector {
    width: 100vw;
    margin-left: -16px;
    margin-right: -16px;

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
