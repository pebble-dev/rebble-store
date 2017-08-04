# Rebble Store for pebble
The Rebble Store is a Pebble Appstore replacement.

If you want to contribute join us on the [Pebble Dev Discord server](http://discord.gg/aRUAYFN), then head to `#appstore`.

This is the Rebble replacement for the Pebble app store. This project is under active development, though the eventual goal is to reach feature parity with the current Pebble smartwatch app store.

This project is built with [VueJS 2](https://vuejs.org/), with webpack scripts included for debugging, hot-reload, and production builds. More information on the Vue webpack build scripts can be found [here](https://github.com/vuejs-templates/webpack).

## Backend/API
This project has a separate backend/api with a Python option and a GoLang option, for now the main one with all the issues is Golang.
- **GoLang:** https://github.com/pebble-dev/rebblestore-api
- **Python:** https://github.com/pebble-dev/rebblestore-api-python

## Installing

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
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

## Installing Dev Environment On Windows 10
First make sure you have [WSL](https://msdn.microsoft.com/en-us/commandline/wsl/install_guide) installed and enabled.

Try running `npm run dev`. If it fails to find `node-sass/vendor` the package must be rebuilt. This can be done with `npm rebuild node-sass`.

A patched version of the `node-macaddress` package is included in the `devDependencies` section of the `package.json` to make the webpack dev environment work inside WSL. The patched package can be found [here](https://github.com/TheBeastOfCaerbannog/node-macaddress#43238cd0569573837d4b48a27b3063d287d2968b), and more information on the bug that requires it can be found [here](https://github.com/AngularClass/angular2-webpack-starter/issues/1273).
