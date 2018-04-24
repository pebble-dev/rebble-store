<script>
import VueContentLoading from 'vue-content-loading'
export default {
  components: {
    VueContentLoading
  }
}
</script>

<template>
  <vue-content-loading :width="720" :height="320" primary="#dddddd" secondary="#bcbcbc">
    <rect x="0" y="0" width="720" height="320"/>
  </vue-content-loading>
</template>
