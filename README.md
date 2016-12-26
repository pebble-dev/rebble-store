# rebble-app-store

## THIS REPO IS UNDER ACTIVE DEVELOPMENT, EVERYTHING IS SUBJECT TO CHANGE!

> Rebble.io Appstore

## Build Setup

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

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Installing Dev Environment On Windows
1. Make sure you have  [WSL](https://msdn.microsoft.com/en-us/commandline/wsl/install_guide) installed.
2. Run Ubuntu installation steps.
3. Try running it with `npm run dev`. If it fails to find `node-sass/vendor` rebuild it `npm rebuild node-sass`.

A patched version of the node-macaddress package is included in the devDependencies section of the package.json to make the webpack dev environment work inside WSL. The patched package can be found [here](https://github.com/TheBeastOfCaerbannog/node-macaddress#43238cd0569573837d4b48a27b3063d287d2968b), and more information on the bug that requires it can be found [here](https://github.com/AngularClass/angular2-webpack-starter/issues/1273).
