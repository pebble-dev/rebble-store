<template>
  <div class="screenshots dragscroll">
      <div class="screenshot" v-for="screenshot in getPlatform().screenshots">
        <img v-bind:src="screenshot" alt="Screenshot" />
      </div>
      <!-- Screenshots -->
    <div class="screenshot-spacer"></div>
  </div>
</template>

<script>
export default {
  name: 'ScreenshotList',
  props: ['platforms', 'clientWatchPlatform'],
  methods: {
    getPlatform: function () {
      var that = this
      for (var i = 0; i < this.platforms.length; ++i) {
        if (this.platforms[i].platform === that.clientWatchPlatform && this.platforms[i].screenshots.length > 0) {
          return this.platforms[i]
        }
      }

      for (i = 0; i < this.platforms.length; ++i) {
        if (this.platforms[i].screenshots.length > 0) {
          return this.platforms[i]
        }
      }

      return []
    }
  }
}
</script>

<style lang="scss">
@import './static/css/_variables.scss';

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
    padding-left: calc(50vw - 92px);
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

</style>
