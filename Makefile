
DOCS=./header.apib
DOCFINAL=./build/final.apib
APPNAME=The-Panic-Store
SOURCES=$(wildcard *.go) $(wildcard */*.go)

all: build doc

${APPNAME}: ${SOURCES}
	go build -ldflags "-X main.buildhost=$(hostname -f) -X main.buildstamp=$(date -u '+%Y-%m-%d_%I:%M:%S%p') -X main.githash=$(git rev-parse HEAD)" -o ${APPNAME} .

build: ${APPNAME}

test:
	go test .

deploy:
	sup production deploy

doc: test ${DOCS} ${APPNAME}
	mkdir -p ./build/
	cat ${DOCS} > ${DOCFINAL}
	docprint -p ${DOCFINAL} -d './build/docs' #-h './build/files/header.html' -c './build/files/custom.css'
