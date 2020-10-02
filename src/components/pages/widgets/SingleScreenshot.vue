<template>
    <div v-if="imageSize !== ''" class="screenshot" :class="$store.state.userParameters.hardware === 'chalk' ? 'round' : ''" v-images-loaded:on.done="loaded">
        <img v-show="screenshotSrc[imageSize] && imageLoaded" v-bind:src="screenshotSrc[imageSize]" alt="Screenshot" />
    </div>
</template>

<script>

import imagesLoaded from 'vue-images-loaded'

export default {
  name: 'SingleScreenshot',
  directives: {
    imagesLoaded
  },
  components: {
  },
  props: [
    'screenshotSrc'
  ],
  data: function () {
    return {
      imageLoaded: false,
      imageSize: ''
    }
  },
  methods: {
    loaded: function (instance) {
      console.log('loaded')
      this.imageLoaded = true
    }
  },
  beforeMount: function () {
    this.imageSize = Object.keys(this.screenshotSrc)[0]
  }
}
</script>

<style lang="scss" scoped>
.loader {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  margin-left: 20px;
  margin-right: 20px;
  &.square {
    width: 144px;
    height: 168px;
  }
  &.round {
    width: 180px;
    height: 180px;
    border-radius: 50%
  }
}

.round {
  img {
    border-radius: 50%;
  }
}

img {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    margin-left: 20px;
    margin-right: 20px;
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}

</style>
