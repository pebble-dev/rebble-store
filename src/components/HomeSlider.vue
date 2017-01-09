<template>
  <header>
    <div id="featured-carousel" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#featured-carousel" data-slide-to="0" class="active"></li>
        <li data-target="#featured-carousel" data-slide-to="1"></li>
        <li data-target="#featured-carousel" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner" role="listbox">
        <div class="carousel-item active"><img class="d-block img-fluid" src="https:/assets.getpebble.com/api/file/mzxYxZmWTbSSyDBG6spA/convert?cache=true&fit=crop&w=720&h=320" alt="First slide"></div>
        <div class="carousel-item"><img class="d-block img-fluid" src="https:/assets.getpebble.com/api/file/kionqG5sSACzS3au4yZo/convert?cache=true&fit=crop&w=720&h=320" alt="Second slide"></div>
        <div class="carousel-item"><img class="d-block img-fluid" src="https:/assets.getpebble.com/api/file/3HYkoCo7SzIaEyYlizBA/convert?cache=true&fit=crop&w=720&h=320" alt="Third slide"></div>
      </div>
      <a class="carousel-control-prev" href="#featured-carousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#featured-carousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </header>
</template>

<script>
export default {
  name: 'home-slider'
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
    .carousel-item.active {
      display: block;
    }
  }
</style>
