  <script>
    import VueContentLoading from 'vue-content-loading'
    export default {
      components: {
        VueContentLoading
      }
    }
  </script>
  
  <template>
    <vue-content-loading :width="170" :height="253" primary="#dddddd" secondary="#bcbcbc">
        <path d="M170,196H0V4A4,4,0,0,1,4,0H166a4,4,0,0,1,4,4Z"/>
        <path d="M169,196v53a3,3,0,0,1-3,3H4a3,3,0,0,1-3-3V196H169m1-1H0v54a4,4,0,0,0,4,4H166a4,4,0,0,0,4-4V195Z"/>
        <rect x="29" y="203" width="106" height="19" rx="4" ry="4"/>
        <rect x="65" y="229" width="34" height="18" rx="4" ry="4"/>
    </vue-content-loading>
  </template>