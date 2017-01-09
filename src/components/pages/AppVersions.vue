<template>
  <div>
    <header>
      <div class="app-banner">
        <img src="https://assets.getpebble.com/api/file/qaQdjUUrSOq0psR1XHDp/convert?cache=true&fit=crop&w=720&h=320" alt="App Banner">
    </div>
    </header>
    <div class="card subsection-inverse card-inverse text-left p-3 app-title-bar">
      <img class="app-icon" src="https://assets.getpebble.com/api/file/9AfKJDBBS72iAYR4WpgK/convert?cache=true&fit=crop&w=48&h=48" alt="My App">
      <div class="title-author">
        <h1 class="tile">Snowy</h1>
        <h2 class="author">Mathew Reiss</h2>
      </div>

      <div class="app-button-container float-right">
        <button type="button" class="btn btn-outline-secondary btn-thumbs-up">
        <svg class="svg-icon icon-thumbs-up" width="25px" height="25px" viewBox="0 0 25 25">
          <use xlink:href="#iconThumbsUp"></use>
        </svg>

        2.3K
        </button>
        <a href="pebble://appstore/57ef907a05e4b17e1c000186" class="btn btn-outline-pebble btn-download">
        <svg class="svg-icon icon-download" width="25px" height="25px" viewBox="0 0 25 25">
          <use xlink:href="#iconDownload"></use>
        </svg>
        GET
        </a>
      </div>
    </div>

    <main class="text-center">
      <div class="card subsection text-left p-3 app-details">
        <h2>Version 4.4</h2> <h3 class="float-right">Dec 7, 2016</h3><hr>
        <pre class="description">Pre-apocalyptic release with some new features and bug-fixes (change log coming post-apocalypse). This has been a wild ride y'all. Not sure if anyone even reads these, but it's been an honor and a privilege to work with such a great community over the last few years. Stay awesome, Pebblers.</pre>
      </div>
      <div class="card subsection text-left p-3 app-details">
        <h2>Version 4.3</h2> <h3 class="float-right">Oct 20, 2016</h3><hr>
        <pre class="description">No information available</pre>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app-version'
}
</script>

<style lang="scss" scoped>
@import './static/css/_variables.scss';

// _app-details.scss
// App details page styles

// Screenshots slider
.screenshots {
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    display: flex;
    margin-bottom: 40px;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    &::-webkit-scrollbar {
        background: transparent;
        width: 0 !important;
    }
    img {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 5px;
        margin-top: 5px;
        user-drag: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-drag: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }
    // This spacer is the one that centers the first screenshot
    .screenshot-spacer {
        width: calc(50vw - 92px);
        height: 168px;
        display: table;
    }
}

// Similar to carousel but only used when displaying only one image
.app-banner {
  max-width: 720px;
  max-height: 320px;
  margin-left: auto;
  margin-right: auto;

  img {
      width: 100%;
      max-width: 720px;
  }
}

// App Description container
pre.description {
  // Make sentences break and prevent scrollbars
  word-wrap: break-word;
  white-space: pre-wrap;

  // Change app description font and weight
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
}

// Title bar displayed below app banner
.app-title-bar {
    padding-left: 68px !important;
    img {
        position: absolute;
        border-radius: 4px;
        width: 42px;
        height: 42px;
        left: 16px;
    }
    // Author name and app title text container
    .title-author {
        height: 42px;
        margin-top: -3px;
        margin-bottom: 3px;
        display: inline-block;
        h1 {
            font-size: 19px;
            line-height: 26px;
            display: inline;
            color: #fff;
        }
        h2 {
            line-height: 16px;
            font-size: 16px;
            color: #c3c3c3;
            margin: 0;
        }

        // Styles for small screens
        @media screen and (max-width: 430px) {
            h1 {
                font-size: 15px;
            }
            h2 {
                font-size: 12px;
            }
        }
        @media screen and (max-width: 320px) {
            h1 {
                font-size: 12px;
            }
            h2 {
                font-size: 10px;
            }
        }
    }

    // Set styles of buttons in the app-button-container (app-details and app-versions page)
    .app-button-container{
        margin-top: 2px;
        margin-bottom: 2px;
        .btn {
            @media screen and (max-width: 430px) {
                // styles for when screen smaller than 430px to avoid breaking all styles (they make things smaller)
                margin-top: 3px;
                font-size: 0.7rem;
                padding: .5rem .5rem;
            }

            // Set thumbs up button styles
            &.btn-thumbs-up {
                // Styles for when it is in focus, hovered, or active
                &:hover, &:focus, &.active {
                    color: #333;
                    outline: none;
                }
            }
        }
    }
}


// App details container (below screenshots)
.app-details {
    // Main title
    h1 {
        font-size: 20px;
        margin: none;
    }
    // Separator
    hr {
        margin-top: 4px;
    }

    // H2 and H3 used in app-versions
    h2 {
        font-size: 16px;
        display: inline;
    }
    h3 {
        display: inline;
        font-size: 14px;
        margin-bottom: 0;
        margin-top: 4px;
    }

    // App Description container
    pre.description {
        // Make sentences break and prevent scrollbars
        word-wrap: break-word;
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -pre-wrap;
        white-space: -o-pre-wrap;
    }

    // App extra-info table (Author, Version, Release date, etc...)
    table {
        margin-top: 30px;
        margin-bottom: 30px;
        tr td {
            padding-right: 10px;
        }
        tr td:last-child {
            padding-right: 0;
        }
    }
    // Buttons at the bottom of the app-details container
    a.app-button {
        div {
            width: calc(100% + 2rem);
            padding: 1rem;
            margin-left: -16px;
            margin-right: -16px;
            border-top: 1px solid #e1e1e1;
        }
        color: $pebble-color;
        &:last-child {
            div {
            margin-bottom: -1rem;
            }
        }
        &:hover, &:focus {
            text-decoration: none;
            outline: none;
        }
    }
}
</style>
