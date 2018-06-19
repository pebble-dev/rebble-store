# Rebble Store for pebble
The Rebble Store is a Pebble Appstore replacement.

If you want to contribute join us on the [Pebble Dev Discord server](http://discord.gg/aRUAYFN), then head to `#appstore`.

This is the Rebble replacement for the Pebble app store. This project is under active development, though the eventual goal is to reach feature parity with the current Pebble smartwatch app store.

This project is built with [VueJS 2](https://vuejs.org/), with webpack scripts included for debugging, hot-reload, and production builds. More information on the Vue webpack build scripts can be found [here](https://github.com/vuejs-templates/webpack).

## Backend/API
This project has a separate backend/api with a Python option and a GoLang option, for now the main one with all the issues is Golang.
- **GoLang:** https://github.com/pebble-dev/rebblestore-api

The Python backend has been deprecated.

## Setting up OpenID keys

To use the account login functionality, you need OpenID identifiers for supported providers.  
Look at `src/App.vue` and update the `client_id` fields for all the auth providers you want to work.

Here are the links to generate these keys:
* [Google](https://console.developers.google.com/apis/credentials);
* [Yahoo](https://developer.yahoo.com/apps/create/).

## Installing

If you want torun a local version you will also need to run the backend.

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8081
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
