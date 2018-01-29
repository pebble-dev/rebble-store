<template>
    <div class="card subsection-inverse card-inverse text-left p-3 app-title-bar">
      <img class="app-icon" v-if="app.assets.appIcon != ''" v-bind:src="app.assets.appIcon" alt="My App">
      <div class="title-author">
        <h1 class="tile">{{ app.title }}</h1>
        <h2 class="author">{{ app.author.name }}</h2>
      </div>

      <div class="app-button-container float-right">
        <button type="button" class="btn btn-outline-secondary btn-thumbs-up">
        <svg class="svg-icon icon-thumbs-up" width="25px" height="25px" viewBox="0 0 25 25">
          <use xlink:href="#iconThumbsUp"></use>
        </svg>

        {{ app.thumbs_up }}
        </button>
        <a v-bind:href="'pebble://appstore/' + app.id" class="btn btn-outline-pebble btn-download">
        <svg class="svg-icon icon-download" width="25px" height="25px" viewBox="0 0 25 25">
          <use xlink:href="#iconDownload"></use>
        </svg>
        GET
        </a>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ScreenshotList',
  props: ['app']
}
</script>

<<style lang="scss">
@import './static/css/_variables.scss';

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
    .app-button-container {
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
          color: #ccc;
          border-color: #ccc;
          // Styles for when it is in focus, hovered, or active
          &:hover, &:active, &.active {
            color: #333;
            outline: none;
            background: #ccc;
          }
        }
      }
    }
}
</style>
