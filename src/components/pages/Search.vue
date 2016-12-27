<template>
  <div>
    <header>
      <div class=" title-card search">
        <input type="text" placeholder="Search">
      </div>
    </header>
    <main class="apps container text-xs-center">
      <card-collection :showTop="false"></card-collection>

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
    </main>
  </div>
</template>

<script>
import CardCollection from './widgets/CardCollection'

export default {
  name: 'search',
  components: {
    CardCollection
  }
}
</script>

<style lang="scss" scoped>
// Change search input font-family
.search {
  padding: 0;
  width: 90vw;
  max-width: 720px;
  max-height: 320px;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);

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
