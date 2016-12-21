<template>
  <div>
    <main class="container text-xs-center">
      <section>
        <div class="page-error page-error--404">

        <h2>Our pet rock has lost your page, sorry about that</h2>

        <svg class="pet-rock-pebble"xmlns="http://www.w3.org/2000/svg" width="406" height="199" viewBox="0 0 406 199" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs>
            <polygon id="a" points="160.865 162.763 243.499 144.619 257.327 109.929 242.053 72.586 209.66 56.935 180.398 34.881 138.125 29.331 89.961 41.943 58.829 43.073 31.846 60.054 13.107 99.878 36.862 138.39 100.393 158.597"/>
            <mask id="d" width="244.22" height="133.432" x="0" y="0" fill="white">
              <use xlink:href="#a"/>
            </mask>
            <circle id="b" cx="80.5" cy="114.5" r="9.5"/>
            <mask id="e" width="19" height="19" x="0" y="0" fill="white">
              <use xlink:href="#b"/>
            </mask>
            <circle id="c" cx="29.5" cy="101.5" r="9.5"/>
            <mask id="f" width="19" height="19" x="0" y="0" fill="white">
              <use xlink:href="#c"/>
            </mask>
          </defs>
          <g fill="none" fill-rule="evenodd" transform="translate(-14 3)">
            <g transform="matrix(-1 0 0 1 271 30)">
              <use fill="#D8D8D8" stroke="#373A3C" stroke-width="10" mask="url(#d)" transform="rotate(-15 135.217 96.047)" xlink:href="#a"/>
              <polyline stroke="#373A3C" stroke-width="2" points="21 129.5 60.5 150 118.5 146.5 175 137 236.5 103 253.5 75.5"/>
              <circle cx="31.5" cy="98.5" r="13.5" fill="#FFFFFF" stroke="#373A3C" stroke-width="2"/>
              <circle cx="83.5" cy="110.5" r="13.5" fill="#FFFFFF" stroke="#373A3C" stroke-width="2"/>
              <use fill="#373A3C" stroke="#373A3C" stroke-width="2" mask="url(#e)" xlink:href="#b"/>
              <use fill="#373A3C" stroke="#373A3C" stroke-width="2" mask="url(#f)" xlink:href="#c"/>
              <circle cx="86" cy="113" r="2" fill="#FFFFFF"/>
              <circle cx="34" cy="100" r="2" fill="#FFFFFF"/>
            </g>
            <polygon fill="#FFFFFF" stroke="#373A3C" stroke-width="5" points="296.576 0 391.886 0 417 22.464 417 91.623 391.886 111.304 308.5 111.304 282.089 128 282.089 100.5 271 91.623 271 22.464"/>
            <text fill="#000000" font-family="OpenSans-Light, Open Sans" font-size="44" font-weight="300">
              <tspan x="307" y="71">404</tspan>
            </text>
          </g>
        </svg>

        <h4>We're getting the following message {{ 404 }}</h4>
        <div class="page-error_buttons">
        <a href="javascript:history.go(0)" class="btn btn-outline-secondary">Try again</a>
        <a href="/" class="btn btn-outline-pebble">Back to home</a>
        </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'error'
}
</script>

<style lang="scss" scoped>
</style>
