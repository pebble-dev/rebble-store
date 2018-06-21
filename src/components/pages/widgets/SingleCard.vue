<template>
  <div v-bind:class="imageLoaded ? 'loaded' : 'loading'">
    <vcl-card class="loader"></vcl-card>
    <router-link class="real-card" v-bind:to="'/app/' + card.id + urlArguments" v-images-loaded:on.done="loaded">
      <div class="card">
        <img class="card-img-top" v-bind:src="card.screenshot_images[0]['144x168']" alt="App Icon">
        <div class="card-block text-xs-center">
          <h6 class="card-title">{{ card.title }}</h6>
          <p class="card-text">
            <small class="text-muted">
              <svg class="svg-icon icon-inverted-thumbs-up" width="16px" height="16px" viewBox="0 0 25 25">
                <use xlink:href="#iconThumbsUp"></use>
              </svg>
              {{ card.hearts }}
            </small>
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import VclCard from './content-loaders/SingleCard'
import imagesLoaded from 'vue-images-loaded'

export default {
  name: 'single-card',
  directives: {
    imagesLoaded
  },
  components: {
    VclCard
  },
  props: {
    card: {
      id: '',
      title: '',
      type: '',
      image_url: '',
      thumbs_up: 0
    },
    urlArguments: {
      type: String,
      default: ''
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
  div.loading {
    .loader {
      display: block;
    }
    .real-card {
      display: none;
    }
  }
  div.loaded {
    .loader {
      display: none;
    }
    .real-card {
      display: block;
    }
  }
    .loader {
      max-width: 170px;
      max-height: 253px;
      margin-bottom: .75rem;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
    }
    a {

        // Remove text decoration that comes from having the .card inside a "a"
        color: #373a3c;
        text-decoration: none;
        &:hover, &:focus {
            color: #373a3c;
            outline: none;
            text-decoration: none;
        }

        @media screen and (max-width: map-get($grid-breakpoints, lg)) {
          // Remove 2 extra cards
          &:last-child, &:nth-last-child(2) {
            display: none;
          }
        }

        .card {
            max-width: 170px;

            .card-title {
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              margin: 7px 6px 5px 6px;
            }

            // Make it smaller on small screens
            @media screen and (max-width: map-get($grid-breakpoints, sm)) {
                max-width: 32vw;
                display: inline-block;
                margin-bottom: .75rem;
                width: 100%;

                .card-block {
                    padding-left: 0.2rem;
                    padding-right: 0.2rem;
                }
                .card-title {
                    font-size: 16px;
                }
            }

            // Make the app-screenshot take full-width
            // TODO: decide what to do with app icons
            img {
                width:100%;
                height:auto;
            }
        }
    }
</style>
