<template>
  <div>
    <header>
      <div class="title-card">
        <h3>Featured</h3>
      </div>
    </header>
    <main class="apps container text-center">
      <card-collection :showTop="false"></card-collection>

      <nav class="text-center">
        <ul class="pagination">
          <li class="page-item disabled">
            <a class="page-link" href="#" tabindex="-1" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
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
              <span aria-hidden="true">&raquo;</span>
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
  name: 'featured',
  components: {
    CardCollection
  }
}
</script>

<style lang="scss" scoped>
</style>
