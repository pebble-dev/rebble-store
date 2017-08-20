<template>
  <div>
    <header>
      <div class="title-card">
        <h3>Featured</h3>
      </div>
    </header>
    <main class="apps container text-center">
      <card-collection :showTop="false" v-bind:cards="featuredCards"></card-collection>

      <nav>
        <ul class="pagination">
          <li class="page-item disabled">
            <a class="page-link" href="#" tabindex="-1" aria-label="Previous">
              <span aria-hidden="true"><i class="fa fa-angle-left" aria-hidden="true"></i></span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <li class="page-item active">
            <a class="page-link" href="#">1 <span class="sr-only">(current)</span></a>
          </li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">4</a></li>
          <li class="page-item"><a class="page-link" href="#">5</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </main>
  </div>
</template>

<script>
import CardCollection from './widgets/CardCollection'

// featuredCards is a placeholder. Todo: actually fetch those from the server.
export default {
  name: 'featured',
  components: {
    CardCollection
  },
  data: function () {
    return {
      featuredCards: {
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
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
