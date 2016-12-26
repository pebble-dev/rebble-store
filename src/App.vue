<template>
  <div id="app">
    <div class="flex-content">
      <svg-container></svg-container>
      <navbar></navbar>
      <router-view></router-view>
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

.page-error {
  h4 {
    // Change font to make this page more interesting
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
  }
}

// Change search input font-family
.search {
    input {
        font-family: 'Open Sans', sans-serif;
        font-weight: 400;
    }
}


// Change fonts in the app-details page
.app-details {
    // Change app description font and weight
    pre.description {
        font-family: 'Raleway', sans-serif;
        font-weight: 400;
    }
    // Change App extra-info table font (Author, Version, Release date, etc...)
    table {
        tr td {
            font-family: 'Open Sans', sans-serif;
        }
        tr td:last-child {
            // A second font to make it look different from the first column
            font-family: 'Raleway', sans-serif;
        }
    }

    // Change the fonts from the buttons at the bottom of the app-details container
    a.app-button {
        div {
            font-family: 'Open Sans', sans-serif;
        }
    }
}

// Change the small "pebble" text in the navbar weight (it was to thin so I had to make it bigger)
.navbar-dark.bg-inverse.translucent {
    .navbar-brand {
        small {
            font-weight: 400;
        }
    }
}

// _helpers.scss
// Mostly styles that doesnt fit anywhere else

body {
  background-color: $main-bg-color;

  // Make footer sticky
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  .flex-content {
    flex: 1;
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

// Pebble colored tag
.tag-pebble {
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
}

// Add new card style called subsection with inverse color
.card.subsection {
    max-width: 720px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 0;
    margin-bottom: 40px;
}
.card.subsection-inverse {
    @extend .card.subsection;
    background-color: #333;
    border-color: #333;
}
// _header.scss
// Header styles including carousel, navbar and app-banners

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

// This .carousel section is actualy the header with the dark grey color (maybe should be completely renamed)
header {
  padding-top: 58px;
  background: linear-gradient(to bottom, rgba(55, 58, 60, 1) 0%, rgba(55, 58, 60, 1) 65%, rgba(55, 58, 60, 0) 65%, rgba(55, 58, 60, 0) 100%);

  // Carousel container
  .carousel {
    max-width: 720px;
    max-height: 320px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background-color: #000;
    }

    // Similar to carousel but only used when displaying only one image
    .app-banner {
        @extend .carousel;
        img {
            width: 100%;
            max-width: 720px;
        }
    }

    // Card that also goes in the header in which title text is displayed
    .title-card {
        @extend .carousel;
        max-height: auto;
        width: 90vw;
        padding: 20px;
        background-color: #fff;
        h3 {
            margin: 0;
        }
    }

    // Similar to title card but with a search input
    .search {
        padding: 0;
        input {
            width: 100%;
            height: 70px;
            font-size: 1.75rem;
            padding: 20px;
            border: 0;
            background: none;
            color: #373a3c;
            &:focus {
                outline: none;
            }
        }
    }
}
// _app-cards.scss
// App Cards styles

// App columns container
.apps{
    margin-top: 40px;

    // Each group of cards is supposed to be a section
    section {
        // Add a margin to the bottom of each section
        margin-bottom: 40px;
        max-width: 850px;
        margin-left: auto;
        margin-right: auto;
        &:last-child {
            // Remove unnecesary margin from the last one
            margin-bottom: 0;
        }
        // The header is the title of each section
        .header {
            height: 30px;
            margin-bottom: 10px;
            h6 {
                float: left;
                display: inline;
                margin-right: 10px;
                margin-bottom: 0;
            }
            a {
                color: #696969;
                float: right;
                &:hover, &:focus {
                text-decoration: none;
                outline: none;
                }
            }
        }

        // This header tool is for selecting between Top Apps and New Releases
        .header-tool {
            margin-bottom: 40px;
        }

        .card-columns {
            // Modify bootstrap's default .card-columns styles
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;

            // Add more columns on large screens
            @media screen and (min-width: map-get($grid-breakpoints, lg)) {
                column-count: 4;
            }

            // Remove gaps on smaller screens
            @media screen and (max-width: map-get($grid-breakpoints, sm)) {
                column-gap: 0;
            }
            column-count: 3;
            column-gap: 1.25rem;


            a {

                // Remove text decoration that comes from having the .card inside a "a"
                color: #373a3c;
                text-decoration: none;
                &:hover, &:focus {
                    color: #373a3c;
                    outline: none;
                    text-decoration: none;
                }
            }

            // This isn't inside the "a" to avoid issue if it doesn't ends up being inside a "a"
            .card {
                max-width: 170px;
                margin: 5px;

                // Make it smaller on small screens
                @media screen and (max-width: map-get($grid-breakpoints, sm)) {
                    max-width: 32vw;
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
    }


}

// Modify default pagination styles, mostly color (not inside section because it may get reused)
ul.pagination {
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
            &:hover, &:focus  {
                // Overwrite hover and focus states
                text-decoration: none;
                outline: none;
            }
        }
    }
}
</style>
