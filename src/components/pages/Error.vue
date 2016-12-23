<template>
  <div>
    <main class="container text-xs-center">
      <section>
        <div class="page-error page-error--404">

        <h2>Our pet rock has lost your page, sorry about that</h2>

        <svg class="pet-rock-pebble" width="408" height="203" viewBox="0 0 408 203">
           <use xlink:href="#svgPetRock"></use>
        </svg>

        <h4>We're getting the following message {{ 404 }}</h4>
        <div class="page-error_buttons">
        <a href="javascript:history.go(0)" class="btn btn-outline-secondary">Try again</a>
        <a href="/#" class="btn btn-outline-pebble">Back to home</a>
        </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'error'
}
</script>

<style lang="scss" scoped>
</style>
