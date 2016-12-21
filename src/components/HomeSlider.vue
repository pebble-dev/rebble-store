<template>
  <header>
    <div id="featured-carousel" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#featured-carousel" data-slide-to="0" class="active"></li>
        <li data-target="#featured-carousel" data-slide-to="1"></li>
        <li data-target="#featured-carousel" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner" role="listbox">
        <div class="carousel-item active"><img src="https:/assets.getpebble.com/api/file/mzxYxZmWTbSSyDBG6spA/convert?cache=true&fit=crop&w=720&h=320" alt="First slide"></div>
        <div class="carousel-item"><img src="https:/assets.getpebble.com/api/file/kionqG5sSACzS3au4yZo/convert?cache=true&fit=crop&w=720&h=320" alt="Second slide"></div>
        <div class="carousel-item"><img src="https:/assets.getpebble.com/api/file/3HYkoCo7SzIaEyYlizBA/convert?cache=true&fit=crop&w=720&h=320" alt="Third slide"></div>
      </div>
      <a class="left carousel-control" href="#featured-carousel" role="button" data-slide="prev"><span class="icon-prev" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a><a class="right carousel-control" href="#featured-carousel" role="button" data-slide="next"><span class="icon-next" aria-hidden="true"></span> <span class="sr-only">Next</span></a>
    </div>
  </header>
</template>

<script>
export default {
  name: 'home-slider'
}
</script>

<style lang="scss" scoped>
</style>
