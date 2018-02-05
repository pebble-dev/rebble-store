<template>
    <div class="screenshot" v-images-loaded:on.done="loaded">
        <img v-show="screenshotSrc && imageLoaded" v-bind:src="screenshotSrc" alt="Screenshot" />
        <vcl-screenshot v-show="!screenshotSrc || !imageLoaded" class="loader"></vcl-screenshot>
    </div>
</template>

<script>

import VclScreenshot from './content-loaders/SingleScreenshot'
import imagesLoaded from 'vue-images-loaded'

export default {
  name: 'SingleScreenshot',
  directives: {
    imagesLoaded
  },
  components: {
    VclScreenshot
  },
  props: [
    'screenshotSrc'
  ],
  data: function () {
    return {
      'imageLoaded': false
    }
  },
  methods: {
    loaded: function (instance) {
      this.imageLoaded = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import './static/css/_variables.scss';
.loader {
  width: 144px;
  height: 168px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 5px;
  margin-top: 5px;
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

</style>
