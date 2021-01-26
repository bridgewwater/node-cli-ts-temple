.PHONY: test check clean build dist all

# each tag change this
ENV_DIST_VERSION := 1.0.0

# change base namespace
ENV_PROJECT_NAME=node-cli-ts-temple

ENV_ROOT ?= $(shell pwd)
ENV_DIST_PATH ?= ./dist
ENV_MODULE_FOLDER ?= ${ENV_ROOT}
ENV_MODULE_MAKE_FILE ?= ${ENV_MODULE_FOLDER}/Makefile
ENV_MODULE_MANIFEST = ${ENV_MODULE_FOLDER}/package.json
ENV_MODULE_CHANGELOG = ${ENV_MODULE_FOLDER}/CHANGELOG.md
ENV_COVERAGE_OUT_FOLDER = ${ENV_ROOT}/coverage/
ENV_NODE_MODULES_FOLDER = ${ENV_ROOT}/node_modules/
ENV_NODE_MODULES_LOCK_FILE = ${ENV_ROOT}/package-lock.json

utils:
	node -v
	npm -v
	npm install -g commitizen cz-conventional-changelog conventional-changelog-cli

versionHelp:
	@git fetch --tags
	@echo "project base info"
	@echo " project name         : ${ENV_PROJECT_NAME}"
	@echo " module folder path   : ${ENV_MODULE_FOLDER}"
	@echo ""
	@echo "=> please check to change version, now is [ ${ENV_DIST_VERSION} ]"
	@echo "-> check at: ${ENV_MODULE_MAKE_FILE}:4"
	@echo " $(shell head -n 4 ${ENV_MODULE_MAKE_FILE} | tail -n 1)"
	@echo "-> check at: ${ENV_MODULE_MANIFEST}:3"
	@echo " $(shell head -n 3 ${ENV_MODULE_MANIFEST} | tail -n 1)"

tagBefore: versionHelp
	@cd ${ENV_MODULE_FOLDER} && conventional-changelog -i ${ENV_MODULE_CHANGELOG} -s --skip-unstable
	@echo ""
	@echo "=> new CHANGELOG.md at: ${ENV_MODULE_CHANGELOG}"
	@echo "place check all file, then can add tag like this!"
	@echo "$$ git tag -a '${ENV_DIST_VERSION}' -m 'message for this tag'"

cleanCoverageOut:
	@if [ -d ${ENV_COVERAGE_OUT_FOLDER} ]; \
	then rm -rf ${ENV_COVERAGE_OUT_FOLDER} && echo "~> cleaned ${ENV_COVERAGE_OUT_FOLDER}"; \
	else echo "~> has cleaned ${ENV_COVERAGE_OUT_FOLDER}"; \
	fi

cleanNpmCache:
	@if [ -d ${ENV_NODE_MODULES_FOLDER} ]; \
	then rm -rf ${ENV_NODE_MODULES_FOLDER} && echo "~> cleaned ${ENV_NODE_MODULES_FOLDER}"; \
	else echo "~> has cleaned ${ENV_NODE_MODULES_FOLDER}"; \
	fi
	@if [ -f ${ENV_NODE_MODULES_LOCK_FILE} ]; \
	then rm -f ${ENV_NODE_MODULES_LOCK_FILE} && echo "~> cleaned ${ENV_NODE_MODULES_LOCK_FILE}"; \
	else echo "~> has cleaned ${ENV_NODE_MODULES_LOCK_FILE}"; \
	fi

cleanAll: cleanCoverageOut cleanNpmCache
	@echo "=> clean all finish"

installGlobal:
	npm install rimraf eslint jest codecov --global

install:
	npm install

installAll: utils installGlobal install
	@echo "=> install all finish"

format:
	npm run format

lint: format
	npm run lint

test:
	npm run test

testCoverage:
	jest --collectCoverage

nodemon:
	npm run dev

build:
	npm run build

run:
	npm run start

help:
	@echo "node module makefile template"
	@echo ""
	@echo " tips: can install node and install utils as"
	@echo "$$ make utils               ~> npm install git cz"
	@echo "  1. then write git commit log, can replace [ git commit -m ] to [ git cz ]"
	@echo "  2. generate CHANGELOG.md doc: https://github.com/commitizen/cz-cli#conventional-commit-messages-as-a-global-utility"
	@echo ""
	@echo "  then you can generate CHANGELOG.md as"
	@echo "$$ make versionHelp         ~> print version when make tageBefore will print again"
	@echo "$$ make tagBefore           ~> generate CHANGELOG.md and copy to module folder"
	@echo ""
	@echo " project name         : ${ENV_PROJECT_NAME}"
	@echo " module folder path   : ${ENV_MODULE_FOLDER}"
	@echo ""
	@echo "Warning: must install node and install module as"
	@echo "$$ make installGlobal       ~> install must tools at global"
	@echo "$$ make install             ~> install project"
	@echo "$$ make installAll          ~> install all include global utils and node_module"
	@echo "$$ make lint                ~> run eslint"
	@echo " unit test as"
	@echo "$$ make test                ~> only run unit test as change"
	@echo "$$ make testAll             ~> run full unit test"
	@echo "$$ make testCoverage        ~> run full unit test and show coverage"
	@echo "$$ make testCICoverage      ~> run full unit test CI coverage"