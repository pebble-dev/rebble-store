<template>
  <div>
	  <header>
      <div class="title-card">
        <h3>Pebble Type</h3>
      </div>
	  </header>
    <main class="text-center">
		  <form>
			  <input type="radio" id="aplite" value="aplite" v-model="platform"> <label for="aplite">Pebble Original/Steel (aplite)</label><br />
			  <input type="radio" id="basalt" value="basalt" v-model="platform"> <label for="basalt">Pebble Time Steel (basalt)</label><br />
			  <input type="radio" id="chalk" value="chalk" v-model="platform"> <label for="chalk">Pebble Time Round (chalk)</label><br />
			  <input type="radio" id="diorite" value="diorite" v-model="platform"> <label for="diorite">Pebble 2 (diorite)</label><br />
		  </form>
	  </main>
  </div>
</template>

<script>
export default {
  name: 'settings',
  data: function () {
    return {
      platform: window.localStorage.getItem('platform')
    }
  },
  watch: {
    platform: function (p) {
      this.platform = p
      window.localStorage.setItem('platform', p)
    }
  },
  beforeMount: function () {
    if (this.platform == null) {
      this.platform = 'aplite'
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  margin-top: 40px;
}
</style>
