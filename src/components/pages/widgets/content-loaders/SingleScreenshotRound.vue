<script>
import VueContentLoading from 'vue-content-loading'
export default {
  components: {
    VueContentLoading
  }
}
</script>

<template>
  <vue-content-loading :width="180" :height="180" primary="#dddddd" secondary="#bcbcbc">
    <circle cx="90" cy="90" r="90"/>
  </vue-content-loading>
</template>
