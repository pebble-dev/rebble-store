<template>
  <div>
    <slider></slider>
    <main class="apps container text-center">
      <card-collection elTitle="Most Recent" v-bind:cards="mostRecentCards"></card-collection>
      <card-collection elTitle="Fresh Picks" v-bind:cards="freshPicksCards"></card-collection>
    </main>
  </div>
</template>

<script>
import CardCollection from './pages/widgets/CardCollection'
import Slider from './Slider'

// mostRecentCards and freshPicksCards are placeholders. Todo: actually fetch those from the server.
export default {
  name: 'Home',
  components: {
    CardCollection,
    Slider
  },
  data: function () {
    return {
      mostRecentCards: {
        'cards': [
          {
            'id': '52cc44e045ffdd31dd000180',
            'title': 'YWeather',
            'type': 'watchface',
            'image_url': 'https://assets.getpebble.com/api/file/Ns6eOrYKQqmYBKOamabV/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 19933
          },
          {
            'id': '533966299820be90ed0000c5',
            'title': 'Real Weather',
            'type': 'watchface',
            'image_url': 'https://assets.getpebble.com/api/file/3nTAsboHTVmxRcR96hcK/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 13413
          },
          {
            'id': '53381b17d1719b42b800028b',
            'title': 'Weather Land',
            'type': 'watchface',
            'image_url': 'https://assets.getpebble.com/api/file/7ZQwPhFzRnOon0lC154m/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 8337
          },
          {
            'id': '52d313a912ea3dcf84000024',
            'title': 'Futura Weather',
            'type': 'watchface',
            'image_url': 'https://assets.getpebble.com/api/file/GtpiSE2SpWyO5Xytsuz1/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 5256
          },
          {
            'id': '53d9650e4b87266dc9000082',
            'title': 'Weather - powered by The Weather Channel',
            'type': 'watchface',
            'image_url': 'https://assets.getpebble.com/api/file/nL8Rpn0Sr2xPvqnX0XVc/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 4609
          },
          {
            'id': '535cf7f618c570bf05000023',
            'title': 'Love Weather',
            'type': 'watchface',
            'image_url': 'https://assets.getpebble.com/api/file/wUP4KTqgTmqoyIHsR6k8/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 4194
          },
          {
            'id': '54f791b593d5fbffb1000090',
            'title': 'Sketchy Weather',
            'type': 'watchface',
            'image_url': 'https://assets.getpebble.com/api/file/1f1P4aoYTJm5pifableO/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 3439
          },
          {
            'id': '547bd7a0fb079720950000a7',
            'title': 'Minimalist Weather',
            'type': 'watchface',
            'image_url': 'https://assets.getpebble.com/api/file/pGyFR0W9QWiVrrCzFKhZ/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 2988
          },
          {
            'id': '52dca032f9d8ec5031000068',
            'title': 'Time\u0026Weather',
            'type': 'watchface',
            'image_url': 'https://assets.getpebble.com/api/file/WoICJjzdQHSzfuxDdQVO/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 2356
          },
          {
            'id': '5599a73fe47bb388a7000056',
            'title': 'Simple Weather',
            'type': 'watchface',
            'image_url': 'https://assets.getpebble.com/api/file/RXAUoSIaRpq3tj3hwGnU/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 2019
          },
          {
            'id': '529eaee7d7894b8324000022',
            'title': 'Weather',
            'type': 'watchapp',
            'image_url': 'https://assets.getpebble.com/api/file/TKQb98tDSJeO83j3oXbK/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 1950
          },
          {
            'id': '566dc3ab7929075b2e000042',
            'title': 'WUnderful Analog (Weather)',
            'type': 'watchface',
            'image_url': 'https://assets.getpebble.com/api/file/U10bXt0DSfusEGiBKgcl/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 1796
          }
        ]
      },
      freshPicksCards: {
        'cards': [
          {
            'id': '566dc3ab7929075b2e000042',
            'title': 'WUnderful Analog (Weather)',
            'type': 'watchface',
            'image_url': 'https://assets.getpebble.com/api/file/U10bXt0DSfusEGiBKgcl/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 1796
          },
          {
            'id': '555147c5095d4f7c75000087',
            'title': ' Analog Hodinky',
            'type': 'watchface',
            'image_url': 'https://assets.getpebble.com/api/file/NPfJzg9FQ4ORvkvPE3qN/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 1059
          },
          {
            'id': '555a3c55c2afa2329c000006',
            'title': 'Simple Analog',
            'type': 'watchface',
            'image_url': 'https://assets.getpebble.com/api/file/EU9YQpETSSWzHV2kdx7o/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 647
          },
          {
            'id': '56128b0799362a9a5500009b',
            'title': 'Analog by Dalpek',
            'type': 'watchface',
            'image_url': 'https://assets.getpebble.com/api/file/gTZD9ONLRGBiGHWDG8dI/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 642
          },
          {
            'id': '55a7f437e2c6fed89b000055',
            'title': 'TimeFace One (Analog)',
            'type': 'watchface',
            'image_url': 'https://assets.getpebble.com/api/file/9CWVMOEOSQGsip7ANKKg/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 471
          },
          {
            'id': '564b100fe4ec39504000000b',
            'title': 'Very Simple Analog',
            'type': 'watchface',
            'image_url': 'https://assets.getpebble.com/api/file/K3osEgGEQEywL9JhVktL/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 369
          },
          {
            'id': '567875eed3e05b0b56000046',
            'title': 'Classic Analogue',
            'type': 'watchface',
            'image_url': 'https://assets.getpebble.com/api/file/xan9O8dFQzKpqE8XNF3a/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 347
          },
          {
            'id': '52f2107ae21be4b82000117d',
            'title': 'Fuzzy Analog',
            'type': 'watchface',
            'image_url': 'https://assets.getpebble.com/api/file/Cog2VxluTiKfQgE80oxt/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 346
          },
          {
            'id': '568ec32dfc66e37c3000006c',
            'title': 'AWW1 - Analog WeatherWatch',
            'type': 'watchface',
            'image_url': 'https://assets.getpebble.com/api/file/VqDC7IF7QWyYvOeJVO80/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 300
          },
          {
            'id': '555e112c0981804be000000c',
            'title': 'Analog',
            'type': 'watchface',
            'image_url': 'https://assets.getpebble.com/api/file/bT4zrDkeSDq5zvAygBnm/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 295
          },
          {
            'id': '57cb6526be5ad0f2d800022b',
            'title': 'Day/Night Analog',
            'type': 'watchface',
            'image_url': 'https://assets.getpebble.com/api/file/JdGlMbBQJyiqtpgL5LBg/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 186
          },
          {
            'id': '56263a92763f6c66c0000057',
            'title': 'Simpler Analog',
            'type': 'watchface',
            'image_url': 'https://assets.getpebble.com/api/file/68UF1XZzSymNPtOamcWJ/convert?cache=true\u0026fit=crop\u0026w=144\u0026h=168',
            'thumbs_up': 184
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
