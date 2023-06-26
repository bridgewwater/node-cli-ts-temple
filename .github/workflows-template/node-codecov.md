## install github app

- [https://github.com/apps/codecov/installations/new](https://github.com/apps/codecov/installations/new)
- add `CODECOV_TOKEN` to action secrets

## config-file

`node-codecov.yml`

```yml
name: node-codecov

on:
  push:
    tags:
      - '*' # Push events to matching *, i.e. 1.0.0 v1.0, v20.15.10

permissions:
  contents: write

jobs:
  node-codecov:
    name: node-codecov
    strategy:
      matrix:
        node-version:
          - 'lts/*'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      -
        name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      -
        name: Test coverage
        run: |
          node -v
          npm install
          npm run build --if-present
          npm test
          npm run jest:coverage

      - name: Codecov
        uses: codecov/codecov-action@v3.1.4
        with:
          token: ${{secrets.CODECOV_TOKEN}}
          files: coverage/clover.xml
#          verbose: true

```