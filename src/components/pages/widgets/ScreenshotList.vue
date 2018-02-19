<template>
  <div v-dragscroll.x="true" class="screenshots">
      <div id="scrollbar" v-bind:style="scrollStyle">
          <single-screenshot v-for="(screenshot, index) in getPlatform().screenshots" v-bind:key="index" v-bind:screenshotSrc="screenshot"></single-screenshot>
      </div>
  </div>
</template>

<script>
import {dragscroll} from 'vue-dragscroll'
import SingleScreenshot from './SingleScreenshot'

export default {
  name: 'ScreenshotList',
  directives: {
    dragscroll
  },
  components: {
    SingleScreenshot
  },
  data: function () {
    return {
      screenshotsCount: 0
    }
  },
  props: ['platforms', 'clientWatchPlatform'],
  methods: {
    getPlatform: function () {
      var that = this
      for (var i = 0; i < this.platforms.length; ++i) {
        if (this.platforms[i].platform === that.clientWatchPlatform && this.platforms[i].screenshots.length > 0) {
          this.screenshotsCount = this.platforms[i].screenshots.length
          return this.platforms[i]
        }
      }

      for (i = 0; i < this.platforms.length; ++i) {
        if (this.platforms[i].screenshots.length > 0) {
          this.screenshotsCount = this.platforms[i].screenshots.length
          return this.platforms[i]
        }
      }
      this.screenshotsCount = 0
      return []
    }
  },
  computed: {
    scrollStyle: function () {
      return {'width': 'calc(100% + (' + this.screenshotsCount + ' - 1) * 184px)'}
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
    margin-bottom: 40px;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;

    &::-webkit-scrollbar {
        background: transparent;
        width: 0 !important;
    }
}

#scrollbar {
    display: inline-block;
    padding-left: calc(50% - 92px);
}

#scrollbar .screenshot {
    float: left;
}

</style>
