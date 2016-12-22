<template>
  <div>
    <header>
      <div class="title-card">
        <h3>Featured</h3>
      </div>
    </header>
    <main class="apps container text-xs-center">
      <section>
        <div class="card-columns">
            <single-card v-for="n in 18">></single-card>
        </div>

        <nav>
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
      </section>
    </main>
  </div>
</template>

<script>
import SingleCard from './widgets/SingleCard'

export default {
  name: 'featured',
  components: {
    SingleCard
  }
}
</script>

<style lang="scss" scoped>
</style>
