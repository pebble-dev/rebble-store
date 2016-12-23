<template>
  <nav class="navbar navbar-fixed-top navbar-dark bg-inverse text-sm-center translucent">
    <div class="navbar-container">
      <a class="navbar-brand" href="/">
        Rebble Store
        <small>
          for&nbsp;
          <div class="pebble">pebble</div>
        </small>
      </a>
      <div class="navbar__items right">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#categorySelector" aria-controls="categorySelector" aria-expanded="false" aria-label="Toggle navigation"></button>
        <a class="search" href="#/search">
          <svg class="icon-search" width="25px" height="25px" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <use xlink:href="#iconSearch"></use>
          </svg>
        </a>
      </div>
    </div>
    <div class="collapse text-xs-center" id="categorySelector">
      <div class="text-muted p-1">
        <div class="btn-group btn-group-lg" role="group">
          <a href="/" class="btn btn-outline-secondary active btn-watchface" role="button">
            <svg class="icon-watchface" width="25px" height="25px" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href="#iconWatchface"></use>
            </svg>
            Watchfaces
          </a>

          <a href="#/apps" class="btn btn-outline-secondary btn-app" role="button">
            <svg class="icon-app" width="25px" height="25px" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href="#iconApp"></use>
            </svg>
            Apps
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style lang="scss" scoped>
</style>
