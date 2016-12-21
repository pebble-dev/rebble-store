<template lang="html">
    <div>
        <header>
          <div class=" title-card search">
            <input type="text" placeholder="Search">
          </div>
        </header>
        <main class="apps container text-xs-center">
          <section>
            <div class="card-columns">

                <app-single_cards v-for="n in 18">></app-single_cards>

            </div>

          </section>
        </main>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
