<template>
  <header>
    <div id="banner-carousel" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li v-for="(banner, index) in banners" v-bind:key="index" data-target="#banner-carousel" v-bind:data-slide-to="index" v-bind:class="index == 0 ? 'active' : ''"></li>
      </ol>
      <div class="carousel-inner" role="listbox">
        <div v-bind:class="index == 0 ? 'carousel-item active' : 'carousel-item'" v-for="(banner, index) in banners" v-bind:key="index"><router-link v-bind:alt="banner.title" v-bind:to="'/app/' + banner.application_id"><single-banner v-bind:bannerSrc="banner.image['720x320']"></single-banner></router-link></div>
      </div>
      <a class="carousel-control carousel-control-prev" href="#banner-carousel" role="button" data-slide="prev">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control carousel-control-next" href="#banner-carousel" role="button" data-slide="next">
        <i class="fa fa-angle-right" aria-hidden="true"></i>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </header>
</template>

<script>
import SingleBanner from './pages/widgets/SingleBanner'

export default {
  name: 'slider',
  components: {
    SingleBanner
  },
  props: {
    banners: null
  },
}
</script>

<style lang="scss" scoped>
  .carousel {
    max-width: 720px;
    max-height: 320px;
    margin-left: auto;
    margin-right: auto;
    background-color: #000;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);

    .carousel-indicators {
      // Slide indicators, make them smaller with browser resize
      margin-bottom: 0;
      margin-left: 30%;
      margin-right: 30%;

    }

    .carousel-control {
      i {
        // carousel control < > icons
        font-size: 30px;
      }
    }

    .carousel-item.active {
      display: block;
    }
  }
</style>
