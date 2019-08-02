<script>
import VueContentLoading from 'vue-content-loading'
export default {
  components: {
    VueContentLoading
  }
}
</script>

<template>
  <vue-content-loading :width="144" :height="168" primary="#dddddd" secondary="#bcbcbc">
    <rect x="0" y="0" width="144" height="168"/>
  </vue-content-loading>
</template>
