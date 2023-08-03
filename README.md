node-cli-ts-temple

[https://github.com/bridgewwater/node-cli-ts-temple](https://github.com/bridgewwater/node-cli-ts-temple)

this is for node TS-CLI programming project.

[![npm version](https://img.shields.io/npm/v/node-cli-temple)](https://www.npmjs.com/package/node-cli-temple)
[![node lts version](https://img.shields.io/node/v-lts/node-cli-temple)](https://www.npmjs.com/package/node-cli-temple)
[![npm license](https://img.shields.io/npm/l/node-cli-temple)](https://www.npmjs.com/package/node-cli-temple)
[![npm download month](https://img.shields.io/npm/dm/node-cli-temple)](https://www.npmjs.com/package/node-cli-temple)
[![npm collaborators](https://img.shields.io/npm/collaborators/node-cli-temple)](https://www.npmjs.com/package/node-cli-temple)

[![ci](https://github.com/bridgewwater/node-cli-ts-temple/workflows/ci/badge.svg)](https://github.com/bridgewwater/node-cli-ts-temple/actions/workflows/ci.yml)

[![GitHub license](https://img.shields.io/github/license/bridgewwater/node-cli-ts-temple)](https://github.com/bridgewwater/node-cli-ts-temple)
[![codecov](https://codecov.io/gh/bridgewwater/node-cli-ts-temple/branch/main/graph/badge.svg)](https://codecov.io/gh/bridgewwater/node-cli-ts-temple)
[![GitHub latest SemVer tag)](https://img.shields.io/github/v/tag/bridgewwater/node-cli-ts-temple)](https://github.com/bridgewwater/node-cli-ts-temple/tags)
[![GitHub release)](https://img.shields.io/github/v/release/bridgewwater/node-cli-ts-temple)](https://github.com/bridgewwater/node-cli-ts-temple/releases)

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
| node     | 16.+    |
| rollup   | ^2.38.0 |
| nodemon  | ^3.0.1  |

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