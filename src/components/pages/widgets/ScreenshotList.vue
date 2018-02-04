<template>
  <div class="screenshots dragscroll">
      <single-screenshot v-for="(screenshot, index) in getPlatform().screenshots" v-bind:key="index" v-bind:screenshotSrc="screenshot"></single-screenshot>
      <!-- Screenshots -->
    <div class="screenshot-spacer"></div>
  </div>
</template>

<script>

import SingleScreenshot from './SingleScreenshot'

export default {
  name: 'ScreenshotList',
  components: {
    SingleScreenshot
  },
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
    // This spacer is the one that centers the first screenshot
    .screenshot-spacer {
        width: calc(50vw - 92px);
        height: 168px;
        display: table;
    }
}

</style>
