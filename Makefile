# AWS Pipeline Makefile

PACKAGE_NAME = "aws-simple-pipeline"
YOUR_USERNAME = "bilardi"

.PHONY: help # print this help list
help:
	grep PHONY Makefile | sed 's/.PHONY: /make /' | grep -v grep

.PHONY: doc # build documentation
doc: 
	cd docs; make html; cd -

.PHONY: clean # remove packaging files
clean:
	rm -rf dist node_modules cdk.out

.PHONY: install # install packages from npm
install: clean
	npm install

.PHONY: test # run unit tests
test: install
	npm run build; npm run test

.PHONY: ltest # run linting using ESLint
ltest: test
	npm run lint

.PHONY: itest # install package locally and test it
itest: ltest
	npm link lib; cd bin; npm link $(PACKAGE_NAME); cdk synth -a 'npx ts-node example.ts'; cd -

.PHONY: btest # build package on npm in beta version
btest: itest
	npm publish --tag beta

.PHONY: ptest # generate a tarball of the package locally
ptest: itest
	npm pack

.PHONY: build # build package on npm
build: itest
	npm publish
