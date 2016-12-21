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
          <svg width="25px" height="25px" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Search" stroke="#a5a6a7">
                <path id="Shape" stroke-width="1.5" class="st0" fill="none" d="M13.9,16.6l1.2-0.4c0,0,0.8-1.5,0.8-1.6c2.3,2.4,4.7,4.7,7,7.1l-2,2
                C18.5,21.2,16.2,18.9,13.9,16.6z"/>
                <polygon id="Shape_1_" stroke-width="2" fill="none" class="st1" points="2.2,10.2 4.6,5 10.3,3 15.4,5.4 17.5,11 15.1,16.1 9.4,18.2 4.3,15.8 		"/>
                <path id="Line" fill="none" class="st2" d="M11.3,6.6l2,1l1,3" stroke-linecap="square"/>
              </g>
            </g>
          </svg>
        </a>
      </div>
    </div>
    <div class="collapse text-xs-center" id="categorySelector">
      <div class="text-muted p-1">
        <div class="btn-group btn-group-lg" role="group">
          <a href="/" class="btn btn-outline-secondary active" role="button">
            <svg class="watchface" width="25px" height="25px" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Clock" stroke-width="2" stroke="rgba(204,204,204,.5)">
                  <polygon id="Shape" fill="none" points="2 8.00285097 8 2 17 2 23 8.00285097 23 17.0255772 17 23 8 23 2 17.0255772"></polygon>
                  <polyline id="Line" stroke-linecap="square" points="15.5630383 14.7579965 12.040745 12.1503281 12 6"></polyline>
                </g>
              </g>
            </svg>
            Watchfaces
          </a>
          <a href="#/apps" class="btn btn-outline-secondary" role="button">
            <svg class="app" width="25px" height="25px" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <defs>
                <polygon id="path-1" points="9 4 19 4 21 6 21 16 19 18 9 18 7 15.9960225 7 6"></polygon>
                <mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="-2" y="-2" width="18" height="18">
                  <rect x="5" y="2" width="18" height="18" fill="white"></rect>
                  <use xlink:href="#path-1" fill="black"></use>
                </mask>
              </defs>
              <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="App">
                  <g id="Rectangle-2">
                    <use fill="none" fill-rule="evenodd" xlink:href="#path-1"></use>
                    <use id="use2" stroke="rgba(204,204,204,.5)" mask="url(#mask-2)" stroke-width="4" xlink:href="#path-1"></use>
                  </g>
                  <polyline id="Line" stroke="rgba(204,204,204,.5)" stroke-width="2" stroke-linecap="square" points="17 22.0005626 7 22.0005626 3 18 3 8"></polyline>
                </g>
              </g>
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
