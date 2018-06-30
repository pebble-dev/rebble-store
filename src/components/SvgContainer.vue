<template>
  <div id="svgContainer">
    <!-- <svg id="petRock" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <polygon id="a" points="160.865 162.763 243.499 144.619 257.327 109.929 242.053 72.586 209.66 56.935 180.398 34.881 138.125 29.331 89.961 41.943 58.829 43.073 31.846 60.054 13.107 99.878 36.862 138.39 100.393 158.597"/>
        <mask id="d" width="244.22" height="133.432" x="0" y="0" fill="white">
          <use xlink:href="#a"/>
        </mask>
        <circle id="b" cx="80.5" cy="114.5" r="9.5"/>
        <mask id="e" width="19" height="19" x="0" y="0" fill="white">
          <use xlink:href="#b"/>
        </mask>
        <circle id="c" cx="29.5" cy="101.5" r="9.5"/>
        <mask id="f" width="19" height="19" x="0" y="0" fill="white">
          <use xlink:href="#c"/>
        </mask>
      </defs>
      <g fill="none" fill-rule="evenodd" transform="translate(-14 3)">
        <g transform="matrix(-1 0 0 1 271 30)">
          <use fill="#D8D8D8" stroke="#373A3C" stroke-width="10" mask="url(#d)" transform="rotate(-15 135.217 96.047)" xlink:href="#a"/>
          <polyline stroke="#373A3C" stroke-width="2" points="21 129.5 60.5 150 118.5 146.5 175 137 236.5 103 253.5 75.5"/>
          <circle cx="31.5" cy="98.5" r="13.5" fill="#FFFFFF" stroke="#373A3C" stroke-width="2"/>
          <circle cx="83.5" cy="110.5" r="13.5" fill="#FFFFFF" stroke="#373A3C" stroke-width="2"/>
          <use fill="#373A3C" stroke="#373A3C" stroke-width="2" mask="url(#e)" xlink:href="#b"/>
          <use fill="#373A3C" stroke="#373A3C" stroke-width="2" mask="url(#f)" xlink:href="#c"/>
          <circle cx="86" cy="113" r="2" fill="#FFFFFF"/>
          <circle cx="34" cy="100" r="2" fill="#FFFFFF"/>
        </g>
        <polygon fill="#FFFFFF" stroke="#373A3C" stroke-width="5" points="296.576 0 391.886 0 417 22.464 417 91.623 391.886 111.304 308.5 111.304 282.089 128 282.089 100.5 271 91.623 271 22.464"/>
        <text fill="#000000" font-family="OpenSans-Light, Open Sans" font-size="44" font-weight="300">
          <tspan x="307" y="71">404</tspan>
        </text>
      </g>
    </svg> -->
</div>
</template>

<script>
const iconList = require.context('@/assets/svg/', true, /\.svg$/)
iconList.keys().forEach(key => iconList(key))

export default {
  name: 'svg-container'
}
</script>

<style lang="scss">
// Remember that font-awesome is included in the projects

  #svgContainer {
    display: none;
  }

  #svgContainer * {
    stroke: inherit;
    fill: inherit;
  }

  .icon-search {
    fill: transparent;
    stroke: #9b9d9e;
    // This should be the color but the overlapping paths make it not ideal because it is 50% translucent
    // stroke: rgba(255, 255, 255, 0.5);
  }

  .icon-settings {
      fill: transparent;
      stroke: #9b9d9e;
  }

  .btn-watchface, .btn-app {
    svg.icon-watchface, svg.icon-app {
        fill: transparent;
        stroke: #828682;
        use {
            fill: transparent;
            color: #828682;
        }
    }
  }

  .icon-inverted-thumbs-up {
    fill: #FFF;
    stroke: #889097;
    position: relative;
    top: 2px;
  }

// Select the dark translucent navbar
.navbar-dark.bg-dark.translucent {
    // Search, magnifier icon
    a.search {
        svg {
            height: 22px;
            margin-top: 3px;
        }
    }
    #categorySelector {

        // Watchface/App Selecctor icon styles
        .btn-group {
            .btn-outline-secondary {
                &.active, &:active,  &:hover {
                    //Hover and active styles
                    svg.icon-watchface, svg.icon-app  {
                        fill: transparent;
                        stroke: #FFF;
                        // Watchface Icon
                        use {
                            color: #fff;
                        }
                    }
                }
                // Default icon styles
                svg {
                    margin-bottom: -6px;
                    position: relative;
                    top: 1px;
                }
            }

        }
    }
}

// App columns container
.apps {
    .card-columns {
        // Modify bootstrap's default .card-columns stylse

        // This isn't inside the "a" to avoid issue if it doesn't ends up being inside a "a"
        .card {
            // Make it smaller on small screens
            @media screen and (max-width: map-get($grid-breakpoints, sm)) {
                .card-text {
                    svg.thumbs-up {
                        height: 14px;
                        top: 3px;
                    }
                }
            }
            .card-text {
                // Style thumbs up svg inside of app card
                svg.thumbs-up {
                    height: 16px;
                    margin-right: -6px;
                    position: relative;
                    top: 2px;
                }
            }
        }
    }
}

// Change the font-size of the arrow in the buttons that are located at the bottom of the app-details container
.app-details{
    a.app-button {
        div {
            i {
                font-size: 25px
            }
        }
    }
}

// Set styles of SVG in the app-button-container (app-details and app-versions page)
.app-button-container{
    .btn {
        @media screen and (max-width: 430px) {
            // Set SVG size and margin when screen smaller than 430px to avoid breaking all styles
            svg {
                height: 16px !important;
                margin-right: -5px;
                margin-bottom: -10px;
                top:-6px !important;
            }
        }
        // Set SVG size and margin
        svg {
            height: 20px;
            position: relative;
            top: 2px;
        }

        // Set thumbs up SVG styles
        &.btn-thumbs-up {
            // Default styles are set in the svg

            // Thumbs up svg ivon hover styles
            .icon-thumbs-up {
                fill: #333;
                stroke: #ccc;
            }
            /*
            We're triggering the hover on the parent button instead of the SVG.
            */
            &:hover, &.active {
                svg {
                    fill: #ccc;
                    stroke: #333;
                }
            }

            &.disabled {
                // Don't change any style if disabled
                &:hover, &.active {
                    svg {
                        fill: #333;
                        stroke: #ccc;
                    }
                }
            }
        }

        // Download button styles
        &.btn-download {
            // Default styles are set in the svg

            // Download svg icon hover styles
            .icon-download {
                fill: #333;
                stroke: #ff4700;
            }
            &:hover {
                svg {
                    fill: #ff4700;
                    stroke: #333;
                }
            }
        }
    }
}

</style>
