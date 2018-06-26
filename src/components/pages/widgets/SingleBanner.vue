<template>
    <div class="app-banner" v-images-loaded:on.done="loaded">
        <img v-show="bannerSrc && imageLoaded" v-bind:src="bannerSrc" alt="Banner" />
        <vcl-banner v-show="!bannerSrc || !imageLoaded" class="loader"></vcl-banner>
    </div>
</template>

<script>

import VclBanner from './content-loaders/SingleBanner'
import imagesLoaded from 'vue-images-loaded'

export default {
  name: 'SingleBanner',
  directives: {
    imagesLoaded
  },
  components: {
    VclBanner
  },
  props: [
    'bannerSrc'
  ],
  watch: {
    'bannerSrc': function () {
      this.imageLoaded = false
    }
  },
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
.loader {
  width: 720px;
  height: 320px;
}

img {
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}

</style>
