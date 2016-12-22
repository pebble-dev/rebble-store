<template>
  <section>
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
        <svg width="25px" height="25px" viewBox="0 0 25 25" version="1.1">
          <use xlink:href="./static/svg/thumbs-up.svg#svgThumbsUp"></use>
        </svg>

        2.3K
        </button>
        <a href="pebble://appstore/57ef907a05e4b17e1c000186" class="btn btn-outline-pebble btn-download">
        <svg width="25px" height="25px" viewBox="0 0 25 25">
          <use xlink:href="./static/svg/download.svg#Download"></use>
        </svg>
        GET
        </a>
      </div>
    </div>

    <main class="text-xs-center">
    <div class="screenshots dragscroll">
      <div class="screenshot-spacer"></div>
      <div class="screenshot"><img src="https://assets.getpebble.com/api/file/DldSOh50Q6u3wizbbkuh/convert?cache=true&fit=crop&w=144&h=168" alt="screenshot"></div>
      <div class="screenshot"><img src="https://assets.getpebble.com/api/file/Wg9B2VfHSZecpH12rGBc/convert?cache=true&fit=crop&w=144&h=168" alt="screenshot"></div>
      <div class="screenshot"><img src="https://assets.getpebble.com/api/file/iZ2JfX8ERDq7RosEBLDp/convert?cache=true&fit=crop&w=144&h=168" alt="screenshot"></div>
      <div class="screenshot"><img src="https://assets.getpebble.com/api/file/ZehJwnicQjmPRHcoAWzn/convert?cache=true&fit=crop&w=144&h=168" alt="screenshot"></div>
      <div class="screenshot"><img src="https://assets.getpebble.com/api/file/tfA108w2QBiqT3YIBbdY/convert?cache=true&fit=crop&w=144&h=168" alt="screenshot"></div>
      <div class="screenshot"><img src="https://assets.getpebble.com/api/file/tfA108w2QBiqT3YIBbdY/convert?cache=true&fit=crop&w=144&h=168" alt="screenshot"></div>
      <div class="screenshot-spacer"></div>
    </div>

    <div class="card subsection text-xs-left p-1 app-details">
      <h1>Description</h1> <hr>
      <pre class="description">Snowy is the most popular personal assistant for Pebble Time. Set reminders, translate sentences, control your home through IFTTT - you name it, and chances are Snowy can help you out.

      For just $2.99 through KiezelPay, you can have the app voted "Most Creative Project" at the 2015 Pebble Developer Retreat, and one of Eric Migicovsky's (Founder and CEO of Pebble) favorite apps! Download Snowy and follow the onscreen instructions for obtaining a license. No companion app, no hassle, all awesome.

      The Pebble smartwatch just got a little smarter...

      ---

      For more information, visit MyDogSnowy.com, and if you love Snowy, remember to give him a ❤️!

      ===

      DANSK (Beta): mydogsnowy.com/da

      DEUTSCH: mydogsnowy.com/de

      ESPAÑOL: mydogsnowy.com/es

      FRANÇAIS: mydogsnowy.com/fr

      ITALIANO: mydogsnowy.com/it

      PORTUGUÊS (Beta): mydogsnowy.com/pt

      Tags: Siri, Cortana, Google Now, Personal Assistant, Voice, Dog, pmkey.xyz</pre>

      <table class="extra-table">
        <tr>
          <td>Developer</td>
          <td>Mathew Reiss</td>
        </tr>
        <tr>
          <td>Tags</td>
          <td><a href="#"><span class="tag tag-pill tag-pebble">Tools & Utilities</span></a></td>
        </tr>
        <tr>
          <td>Updated</td>
          <td>Dec 7, 2016</td>
        </tr>
        <tr>
          <td>Version</td>
          <td>4.4</td>
        </tr>
      </table>
      <a href="#/app-versions" class="app-button">
        <div>
          Version information <i class="fa fa-angle-right float-xs-right" aria-hidden="true"></i>
        </div>
      </a>
      <a href="#" class="app-button">
        <div>
          Website Link <i class="fa fa-angle-right float-xs-right" aria-hidden="true"></i>
        </div>
      </a>
      <a href="#" class="app-button">
        <div>Support <i class="fa fa-angle-right float-xs-right" aria-hidden="true"></i>
        </div>
      </a>
      <a href="#/author" class="app-button">
        <div>More From This Developer<i class="fa fa-angle-right float-xs-right" aria-hidden="true"></i>
        </div>
      </a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'app-details'
}
</script>

<style lang="scss" scoped>
</style>
