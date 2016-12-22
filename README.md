## The Panic Store for pebble
The Panic Store is a Pebble App store.
If you want to contribute send us a PM.

## Requirements

Backend/API layer requires `git`, `go`, `npm`, and `docprint`.

## Dev Environment Setup
Pull down the project within your `$GOPATH`'s src folder ($GOPATH is an
environment variable and is typically set to $HOME/go/ on \*nix). This can be
done by running (for example) the following set of commands:

		GOPATH=go/
    mkdir -p $GOPATH/src/pebble-dev
		git clone https://github.com/pebble-dev/The-Panic-Store.git --branch dev/backend $GOPATH/src/pebble-dev/The-Panic-Store

Please [go fmt your code](https://blog.golang.org/go-fmt-your-code) and run `go
test` before committing your changes. Some editor plugins (such as vim-go)
should be able to do this automatically before save.

## Build Process

### Backend
1. If you haven't already, you will need to run `go get -v .` within the
	 project directory.
2. Run either `make` to build everything, or `go build -v .` to just build the
	 go executable.
