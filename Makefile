.PHONY: test check clean build dist all

# change base namespace
ROOT_NAME =node-cli-ts-temple

ENV_ROOT ?=$(shell pwd)
ENV_MODULE_FOLDER ?=${ENV_ROOT}
ENV_MODULE_MAKE_FILE ?=${ENV_MODULE_FOLDER}/Makefile
ENV_MODULE_MANIFEST =${ENV_MODULE_FOLDER}/package.json
ENV_MODULE_CHANGELOG =${ENV_MODULE_FOLDER}/CHANGELOG.md
ENV_COVERAGE_OUT_FOLDER =${ENV_ROOT}/coverage/
ENV_NODE_MODULES_FOLDER =${ENV_ROOT}/node_modules/
ENV_NODE_MODULES_LOCK_FILE =${ENV_ROOT}/package-lock.json
ENV_ROOT_CHANGELOG_PATH?=CHANGELOG.md

all: env

env:
	@echo "== project env info start =="
	@echo ""
	@echo "ROOT_NAME                                 ${ROOT_NAME}"
	@echo "ENV_MODULE_FOLDER                         ${ENV_MODULE_FOLDER}"
	@echo "ENV_ROOT_CHANGELOG_PATH                   ${ENV_ROOT_CHANGELOG_PATH}"
	@echo ""
	@echo "test info"
	@echo "ENV_COVERAGE_OUT_FOLDER                   ${ENV_COVERAGE_OUT_FOLDER}"
	@echo "== project env info end =="

cleanCoverageOut:
	@$(RM) -r ${ENV_COVERAGE_OUT_FOLDER}
	$(info ~> has cleaned ${ENV_COVERAGE_OUT_FOLDER})

cleanNpmCache:
	@$(RM) -r ${ENV_NODE_MODULES_FOLDER}
	$(info ~> has cleaned ${ENV_NODE_MODULES_FOLDER})
	@$(RM) ${ENV_NODE_MODULES_LOCK_FILE}
	$(info ~> has cleaned ${ENV_NODE_MODULES_LOCK_FILE})

cleanAll: cleanCoverageOut cleanNpmCache
	@echo "=> clean all finish"

installGlobal:
	npm install --global rimraf eslint jest

install:
	npm install

installAll: utils installGlobal install
	@echo "=> install all finish"

upgradeAll:
	ncu -u
	npm ci

lint:
	npm run lint

test:
	jest --ci

testCoverage:
	jest --collectCoverage

testCICoverage:
	$(info "if codecov not install, please install as: npm install -g codecov")
	jest --ci --coverage
	codecov

testAll:
	npm run test

style:
	npm run format

buildIfPresent:
	npm run build --if-present

ci: buildIfPresent lint test

nodemon:
	npm run dev

build:
	npm run build

run:
	npm run start

utils:
	node -v
	npm -v
	npm install -g commitizen cz-conventional-changelog conventional-changelog-cli npm-check-updates standard-version

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
	@echo " project name         : ${ROOT_NAME}"
	@echo " module folder path   : ${ENV_MODULE_FOLDER}"
	@echo ""
	@echo "Warning: must install node and install module as"
	@echo "$$ make installGlobal       ~> install must tools at global"
	@echo "$$ make install             ~> install project"
	@echo "$$ make installAll          ~> install all include global utils and node_module"
	@echo "$$ make style               ~> run style check auto format"
	@echo "$$ make ci                  ~> run ci"
	@echo " unit test as"
	@echo "$$ make test                ~> only run unit test as change"
	@echo "$$ make testAll             ~> run full unit test"
	@echo "$$ make testCoverage        ~> run full unit test and show coverage"
	@echo "$$ make testCICoverage      ~> run full unit test CI coverage"
	@echo " dev as"
	@echo "$$ make nodemon             ~> will run auto compile"