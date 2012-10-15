all: test build
build:
	coffee -c -o ./ src/link-injection.coffee
