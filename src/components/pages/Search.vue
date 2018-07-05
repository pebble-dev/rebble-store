<template>
  <ais-index :search-store="rebbleSearch" :query="query" :query-parameters="queryParameters">
    <div>
      <header>
        <div class=" title-card search">
          <ais-input inline-template>
            <input placeholder="Search" type="search" autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false" v-model="query">
          </ais-input>
        </div>
      </header>
      <main class="apps container text-center">
        <div class="text-center header-tool">
          <div class="btn-group btn-group-sm" role="group">
            <router-link v-bind:to="`/faces/search/${query}/${page}`" v-bind:class="type == 'faces' ? 'btn btn-outline-secondary active': 'btn btn-outline-secondary'" role="button">Watchfaces</router-link>
            <router-link v-bind:to="`/apps/search/${query}/${page}`" v-bind:class="type == 'apps' ? 'btn btn-outline-secondary active': 'btn btn-outline-secondary'" role="button">Apps</router-link>
          </div>
        </div>
        <ais-results v-if="rebbleSearch.query != ''" :results-per-page="24" inline-template>
          <card-collection :showTop="false" v-bind:cards="results" v-bind:urlArguments="urlArguments" v-bind:searchData="true"></card-collection>
        </ais-results>
        <nav>
          <ais-pagination class="pagination" :classNames="{
              'ais-pagination': 'pagination',
              'ais-pagination__item': 'page-item',
              'ais-pagination__link': 'page-link',
              'ais-pagination__item--active': 'active',
              'ais-pagination__item--disabled': 'disabled'

              }" v-on:page-change="on_page_change"/>
        </nav>
      </main>
    </div>
  </ais-index>
</template>

<script>
import { createFromAlgoliaCredentials } from 'vue-instantsearch'
const rebbleSearch = createFromAlgoliaCredentials(
  '7683OW76EQ',
  '252f4938082b8693a8a9fc0157d1d24f'
)
rebbleSearch.indexName = 'rebble-appstore-production'

export default {
  name: 'search',
  props: {
    type: {
      type: String,
      default: 'faces'
    },
    query: {
      type: String,
      default: ''
    },
    page: {
      type: String,
      default: '1'
    }
  },
  data: function () {
    return {
      rebbleSearch,
      'queryParameters': {
        'tagFilters': '',
        'page': 3
      },
      urlArguments: '',
      hardware: 'chalk'
    }
  },
  methods: {
    build_filter_list: function () {
      var filterList = []
      if (this.$store.state.storeParameters.platform !== '') {
        filterList.push(this.$store.state.storeParameters.platform)
      }
      if (this.$store.state.storeParameters.hardware !== '') {
        filterList.push(this.$store.state.storeParameters.hardware)
      }
      if (this.type === 'faces') {
        filterList.push('(watchface)')
      } else if (this.type === 'apps') {
        filterList.push('(watchapp,companion-app)')
      }
      return filterList.join(',')
    },
    on_page_change: function (page) {
      this.page = page
      this.$router.push({
        path: `/${this.type}/search/${this.query}/${this.page}`
      })
    }

  },
  beforeMount: function () {
    // Set url arguments if exist
    this.urlArguments = this.platform ? '?platform=' + this.platform : ''

    this.queryParameters.tagFilters = this.build_filter_list()
    this.queryParameters.page = Number(this.page)
  },
  watch: {
    'rebbleSearch.query' (value) {
      if (this.$router.params === undefined) {
        this.$router.push({ path: `/${this.type}/search/${value}/${this.page}` })
      } else {
        this.$router.push({
          path: `/${this.type}/search`,
          params: { query: value, page: this.page }
        })
      }
    },
    'type' () {
      this.queryParameters.tagFilters = this.build_filter_list()
    }
  }

}
</script>

<style lang="scss" scoped>
.title-card {
  padding: 0;
}

.search {
  input {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    width: 100%;
    height: 70px;
    font-size: 1.75rem;
    padding: 20px;
    border: 0;
    background: none;
    color: #373a3c;
    &:focus {
      outline: none;
    }
  }
}
.header-tool {
  margin-bottom: 40px;
}
</style>
