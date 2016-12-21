
DOCS=./header.apib ./main.apib
DOCFINAL=./build/final.apib
APPNAME=The-Panic-Store

all: build doc

build:
	go build -ldflags "-X main.buildhost=$(hostname -f) -X main.buildstamp=$(date -u '+%Y-%m-%d_%I:%M:%S%p') -X main.githash=$(git rev-parse HEAD)" -o ${APPNAME} .

test:
	go test .

deploy:
	sup production deploy

doc: test ${DOCS}
	mkdir -p ./build/
	cat ${DOCS} > ${DOCFINAL}
	docprint -p ${DOCFINAL} -d './build/docs' #-h './build/files/header.html' -c './build/files/custom.css'
