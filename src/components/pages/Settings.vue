<template>
    <div>
        <header class="main">
            <div class="title-card">
                <h3>Pebble Type</h3>
            </div>
        </header>
        <main class="text-center">
            <form>
                <input type="radio" id="aplite" value="aplite" v-model="hardware"> <label for="aplite">Pebble
                Original/Steel (aplite)</label><br/>
                <input type="radio" id="basalt" value="basalt" v-model="hardware"> <label for="basalt">Pebble Time and Time Steel
                (basalt)</label><br/>
                <input type="radio" id="chalk" value="chalk" v-model="hardware"> <label for="chalk">Pebble Time Round
                (chalk)</label><br/>
                <input type="radio" id="diorite" value="diorite" v-model="hardware"> <label for="diorite">Pebble 2
                (diorite)</label><br/>
            </form>
        </main>
    </div>
</template>

<script>
export default {
  name: 'settings',
  data: function () {
    return {
      hardware: this.$store.state.userParameters.hardware
    }
  },
  watch: {
    hardware: function (p) {
      this.hardware = p
      this.$store.state.userParameters.hardware = p
      window.localStorage.setItem('hardware', p)
    }
  },
  beforeMount: function () {
    this.setTitle('Settings')
  }
}
</script>

<style lang="scss" scoped>
main {
  margin-top: 40px;
}
</style>
