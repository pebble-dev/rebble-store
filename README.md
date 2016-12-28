# Rebble Store for pebble
Rebble Store is a Pebble App store.
If you want to contribute send us a PM.

This is the Rebble replacement for the Pebble app store. This project is under active development, though the eventual goal is to reach feature parity with the current Pebble smartwatch app store.

This project is built with [VueJS 2](https://vuejs.org/), with webpack scripts included for debugging, hot-reload, and production builds. More information on the Vue webpack build scripts can be found [here](https://github.com/vuejs-templates/webpack).

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
