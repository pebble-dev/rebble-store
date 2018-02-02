<template>
  <div>
    <header>
        <div class="title-card">
            <h3>Games</h3>
        </div>
    </header>
    <main class="apps container text-center">
        <div class="text-center header-tool">
          <div class="btn-group btn-group-sm" role="group">
            <a href="#" class="btn btn-outline-secondary active" role="button">Top Apps</a>
            <a href="#" class="btn btn-outline-secondary" role="button">New Releases</a>
          </div>
        </div>

        <card-collection :showTop="false" v-bind:urlArguments='urlArguments'></card-collection>

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

export default {
  name: 'category',
  components: {
    CardCollection
  },
  props: {
    platform: ''
  },
  data: function () {
    return {
      'urlArguments': ''
    }
  },
  beforeMount: function () {
    // Set url arguments if exist
    this.platform ? (this.urlArguments = '?platform=' + this.platform) : ''
  }
}
</script>

<style lang="scss" scoped>
.header-tool {
  margin-bottom: 40px;
}
</style>
