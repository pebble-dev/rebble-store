<template>
  <div>
    <header>
      <div class="app-banner">
        <img src="https://assets.getpebble.com/api/file/qaQdjUUrSOq0psR1XHDp/convert?cache=true&fit=crop&w=720&h=320" alt="App Banner">
    </div>
    </header>
    <div class="card subsection-inverse card-inverse text-xs-left p-1 app-title-bar">
      <img class="app-icon" src="https://assets.getpebble.com/api/file/9AfKJDBBS72iAYR4WpgK/convert?cache=true&fit=crop&w=48&h=48" alt="My App">
      <div class="title-author">
        <h1 class="tile">Snowy</h1>
        <h2 class="author">Mathew Reiss</h2>
      </div>

      <div class="app-button-container float-xs-right">
        <button type="button" class="btn btn-outline-secondary btn-thumbs-up">
          <svg class="icon-thumbs-up" width="25px" height="25px" viewBox="0 0 25 25" version="1.1">
            <use xlink:href="#ThumbsUp"></use>
          </svg>
          2.3K
        </button>
        <a href="pebble://appstore/57ef907a05e4b17e1c000186" class="btn btn-outline-pebble btn-download">
          <svg class="icon-download" width="25px" height="25px" viewBox="0 0 25 25">
            <use xlink:href="#Download"></use>
          </svg>
          GET
        </a>
      </div>
    </div>

    <main class="text-xs-center">
      <div class="card subsection text-xs-left p-1 app-details">
        <h2>Version 4.4</h2> <h3 class="float-xs-right">Dec 7, 2016</h3><hr>
        <pre class="description">Pre-apocalyptic release with some new features and bug-fixes (change log coming post-apocalypse). This has been a wild ride y'all. Not sure if anyone even reads these, but it's been an honor and a privilege to work with such a great community over the last few years. Stay awesome, Pebblers.</pre>
      </div>
      <div class="card subsection text-xs-left p-1 app-details">
        <h2>Version 4.3</h2> <h3 class="float-xs-right">Oct 20, 2016</h3><hr>
        <pre class="description">No information available</pre>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app-version'
}
</script>

<style lang="scss" scoped>
</style>
