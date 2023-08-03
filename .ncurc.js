// https://github.com/raineorshine/npm-check-updates/tree/main#options
module.exports = {
  upgrade: false,
  format: 'group',
  reject: [
    'chalk',
    'rollup',
    '@rollup/plugin-json',
    'rollup-plugin-typescript2'
  ]
}
