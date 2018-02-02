<template>
  <footer v-bind:class="brand ? 'inApp' : 'main'">
    <div class="brand" to="/">
        Rebble Store&nbsp;<small>for&nbsp;pebble</small>
    </div>
    <div class="main">
        <p>© {{ new Date().getFullYear() }} Rebble · <a href="#">Contact Us</a> · <a href="#">Terms</a></p>
        <a class="pull-right" href="#">Developer Portal</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'page-footer',
  props: {
    brand: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import './static/css/_variables.scss';

// _footer.scss
// Footer styles


footer.main {
    .main {
        display: block;
    }
    .brand {
        display: none;
    }
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

footer.inApp {
    user-select: none;
    text-align: center;
    .main {
        display: none;
    }
    .brand {
        display: block;
        margin-left: auto;
        margin-right: auto;
        font-weight: 700;
        font-size: 20px;
        color: rgb(148, 148, 148);
        small {
            font-weight: 700;
        }
        margin: 20px 10px;
    }
}

</style>
