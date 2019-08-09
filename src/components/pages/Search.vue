<template>
  <ais-instant-search :search-client="rebbleSearch" index-name="rebble-appstore-production" :routing="routing">
    <ais-configure :hits-per-page.camel="24" :tag-filters.camel="build_filter_list()" />
    <div>
      <header class="main">
        <div class="title-card search">
          <ais-search-box>
            <input autofocus placeholder="Search" type="search" autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false" slot-scope="{ currentRefinement, refine }" :value="currentRefinement" @input="refine($event.currentTarget.value)">
          </ais-search-box>
        </div>
      </header>
      <main class="apps container text-center">
        <div class="text-center header-tool">
          <div class="btn-group btn-group-sm" role="group">
            <router-link v-bind:to="'/faces/search'" v-bind:class="type == 'faces' ? 'btn btn-outline-secondary active': 'btn btn-outline-secondary'" role="button">Watchfaces</router-link>
            <router-link v-bind:to="'/apps/search'" v-bind:class="type == 'apps' ? 'btn btn-outline-secondary active': 'btn btn-outline-secondary'" role="button">Apps</router-link>
          </div>
        </div>
        <ais-hits>
          <card-collection  slot-scope="{ items }" :showTop="false" v-bind:cards="items" v-bind:searchData="true"></card-collection>
        </ais-hits>
        <nav>
          <ais-pagination :classNames="{
              'ais-Pagination-list': 'pagination',
              'ais-Pagination-item': 'page-item',
              'ais-Pagination-link': 'page-link',
              'ais-Pagination-item--selected': 'active',
              'ais-Pagination-item--disabled': 'disabled'

              }" />
        </nav>
      </main>
    </div>
  </ais-instant-search>
</template>

<script>
import algoliasearch from 'algoliasearch/lite'
import { searchRouting } from '../../router/search-router'
import { simple as simpleMapping } from 'instantsearch.js/es/lib/stateMappings'
import { platformEnum, hardwareEnum } from '../../store/userParameters'

export default {
  name: 'search',
  props: {
    type: {
      type: String,
      default: 'faces'
    }
  },
  data () {
    return {
      rebbleSearch: algoliasearch(
        '7683OW76EQ',
        '252f4938082b8693a8a9fc0157d1d24f'
      ),
      routing: {
        router: searchRouting.router,
        stateMapping: simpleMapping()
      }
    }
  },
  methods: {
    build_filter_list: function () {
      var filterList = []
      if (this.$store.state.userParameters.platform !== platformEnum.all) {
        filterList.push(this.$store.state.userParameters.platform)
      }
      if (this.$store.state.userParameters.hardware !== hardwareEnum.all) {
        filterList.push(this.$store.state.userParameters.hardware)
      }
      if (this.type === 'faces' || this.type === 'watchfaces') {
        filterList.push('(watchface)')
      } else if (this.type === 'apps' || this.type === 'watchapps') {
        filterList.push('(watchapp,companion-app)')
      }
      return filterList.join(',')
    }
  },
  beforeMount: function () {
    this.setTitle('Search')
  }

}
</script>

<style lang="scss" scoped>
.title-card {
  padding: 0;
}

.search {
  input {
    margin: -20px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    width: calc(100% + 40px);
    height: 70px;
    font-size: 1.75rem;
    padding: 20px;
    border: 0;
    background: none;
    color: #373a3c;
    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration { display: none; }

    &:focus {
      outline: none;
    }
  }
}
.header-tool {
  margin-bottom: 40px;
}

.ais-Pagination {
  margin-top: 40px
}
</style>
