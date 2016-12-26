<template>
  <footer>
   <p>© 2016 Rebble · <a href="#">Contact Us</a> · <a href="#">Terms</a></p>
   <a class="pull-right" href="#">Developer Portal</a>
  </footer>
</template>

<script>
export default {
  name: 'page-footer'
}
</script>

<style lang="scss" scoped>
@import './static/css/_variables.scss';

// _footer.scss
// Footer styles


footer {
    margin-top: 40px;
    background-color: $pebble-color;
    color: #fff;
    padding: 5px 10px;
    // Footer text styles
    p {
        display: inline;
    }

    // Prevent bootstrap default link color and text-decoration
    a, a:hover, a:focus {
        color: #ebebeb;
        text-decoration: none;
    }
}

</style>
