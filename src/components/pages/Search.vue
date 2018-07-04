<template>
  <ais-index :search-store="rebbleSearch" :query="query" :queryParameters="queryParameters">
    <div>
      <header>
        <div class=" title-card search">
          <ais-input inline-template>
            <input placeholder="Search" type="search" autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false" v-model="query">
          </ais-input>
        </div>
      </header>
      <main class="apps container text-center">
        <ais-tree-menu :attributes="['type']"></ais-tree-menu>
        <ais-results v-if="rebbleSearch.query != ''" inline-template>
          <card-collection :showTop="false" v-bind:cards="results" v-bind:urlArguments="urlArguments" v-bind:searchData="true" v-bind:store-parameters="storeParameters"></card-collection>
        </ais-results>

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
    backendUrl: '',
    storeParameters: {
      type: Object
    },
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
        tagFilters: ''
      },
      urlArguments: '',
      hardware: 'chalk'
    }
  },
  methods: {
    build_filter_list: function () {
      var filterList = []
      console.log(this.storeParameters.hardware)
      if (this.storeParameters.platform !== '') {
        filterList.push(this.storeParameters.platform)
      }
      if (this.storeParameters.hardware !== '') {
        filterList.push(this.storeParameters.hardware)
      }
      if (this.type === 'faces') {
        filterList.push('(watchface)')
      } else if (this.type === 'apps') {
        filterList.push('(watchapp,companion-app)')
      }
      return filterList.join(',')
    }

  },
  beforeMount: function () {
    // Set url arguments if exist
    console.log(this.storeParameters.hardware)
    this.urlArguments = this.platform ? '?platform=' + this.platform : ''
    console.log(this.page)

    this.queryParameters.tagFilters = this.build_filter_list()
  },
  watch: {
    'rebbleSearch.query' (value) {
      console.log(rebbleSearch)
      if (this.$router.params === undefined) {
        this.$router.push({ path: `/${this.type}/search/${value}` })
      } else {
        this.$router.push({
          path: `/${this.type}/search`,
          params: { query: value }
        })
      }
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
</style>
