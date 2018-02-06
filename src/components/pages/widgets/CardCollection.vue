<template>
  <section class="text-center">
    <div class="header" v-if="showTop">
      <h6 class="text-left">
        <div class="pebble">{{ elTitle }}</div>
      </h6>
      <small><a class="text-right" href="/featured">See All ></a></small>
    </div>
    <div class="card-columns">
      <single-card v-for="(card, index) in cards.cards" v-bind:card="card" v-bind:key="index" v-bind:urlArguments="urlArguments"></single-card>
    </div>
  </section>
</template>

<script>
import SingleCard from './SingleCard'

export default {
  name: 'card-collection',
  props: {
    elTitle: {
      type: String,
      default: 'Collection Title'
    },
    showTop: {
      type: Boolean,
      default: true
    },
    cards: {
      cards: []
    },
    urlArguments: {
      type: String,
      default: ''
    }
  },
  components: {
    SingleCard
  }
}
</script>

<style lang="scss" scoped>
    // Each group of cards is supposed to be a section
    section {
        // Add a margin to the bottom of each section
        margin-bottom: 40px;
        max-width: 850px;
        margin-left: auto;
        margin-right: auto;
        &:last-child {
            // Remove unnecesary margin from the last one
            margin-bottom: 0;
        }
        // The header is the title of each section
        .header {
            height: 30px;
            margin-bottom: 10px;
            h6 {
                float: left;
                display: inline;
                margin-right: 10px;
                margin-bottom: 0;
            }
            a {
                color: #696969;
                float: right;
                &:hover, &:focus {
                text-decoration: none;
                outline: none;
                }
            }
        }
        .card-columns {
            // Modify bootstrap's default .card-columns styles
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: -12px;

            // Add more columns on large screens
            @media screen and (min-width: map-get($grid-breakpoints, lg)) {
                column-count: 4;
            }

            // Remove gaps on smaller screens
            @media screen and (max-width: map-get($grid-breakpoints, sm)) {
                column-gap: 5px;
            }

            column-count: 3;
            column-gap: calc(1.25rem + 5px);

        }
    }

</style>
