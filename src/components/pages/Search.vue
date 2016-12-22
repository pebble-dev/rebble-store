<template>
  <div>
    <header>
      <div class=" title-card search">
        <input type="text" placeholder="Search">
      </div>
    </header>
    <main class="apps container text-xs-center">
      <section>
        <div class="card-columns">
          <single-card v-for="n in 18">></single-card>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import SingleCard from './widgets/SingleCard'

export default {
  name: 'search',
  components: {
    SingleCard
  }
}
</script>

<style lang="scss" scoped>
</style>
