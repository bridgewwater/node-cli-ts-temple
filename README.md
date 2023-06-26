node-cli-ts-temple

[https://github.com/bridgewwater/node-cli-ts-temple](https://github.com/bridgewwater/node-cli-ts-temple)

this is for node CLI programming project.

[![node-ci](https://github.com/bridgewwater/node-cli-ts-temple/workflows/node-ci/badge.svg)](https://github.com/bridgewwater/node-cli-ts-temple/actions/workflows/node-ci.yml)
[![NPM Version](http://img.shields.io/npm/v/node-cli-ts-temple.svg?style=flat)](https://www.npmjs.org/package/node-cli-ts-temple)
[![NPM Downloads](https://img.shields.io/npm/dm/node-cli-ts-temple.svg?style=flat)](https://npmcharts.com/compare/node-cli-ts-temple?minimal=true)
[![codecov](https://codecov.io/gh/bridgewwater/node-cli-ts-temple/branch/master/graph/badge.svg)](https://codecov.io/gh/bridgewwater/node-cli-ts-temple)

# Features

this is for node CLI programming project.

- support jest
- support git action

## Contributing

[![Contributor Covenant](https://img.shields.io/badge/contributor%20covenant-v1.4-ff69b4.svg)](.github/CONTRIBUTING_DOC/CODE_OF_CONDUCT.md)
[![GitHub contributors](https://img.shields.io/github/contributors/bridgewwater/template-golang-lib)](https://github.com/bridgewwater/template-golang-lib/graphs/contributors)

We welcome community contributions to this project.

Please read [Contributor Guide](.github/CONTRIBUTING_DOC/CONTRIBUTING.md) for more information on how to get started.

## usage

```bash
$ npm install -g node-cli-ts-temple
$ node-cli-ts-temple --help
# make node TypeScript cli project
$ node-cli-ts-temple node-ts-cli --help
```

more use see [doc/README.md](doc/README.md)

## character

- support code check `prettier` `eslint` `tslint`
- support unit test `jest` for typescript
- support `rollup` build node cli
- support `nodemon` auto build
- support global config setting and log save

## env

| item     | version |
|:---------|:--------|
| node     | 10.+    |
| prettier | ^2.2.1  |
| eslint   | ^7.18.0 |
| tslint   | ^6.1.3  |
| jest     | ^26.6.3 |
| rollup   | ^2.38.0 |
| nodemon  | ^2.0.7  |
| log4js   | ^6.3.0  |

## dev

```bash
# install dependencies
npm install
# use nodemon auto generate build
npm run dev

# then test cli --help as
npm run cli:help

# prettier
npm run format
# lint check ts or js
npm run lint
```

## prod

```bash
npm ci
# or
npm install

# then
npm run build
```