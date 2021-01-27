import pkgInfo from '../../package.json'

export { pkgInfo }

let cacheBinName = ''

export const binName = (): string => {
  if (!cacheBinName || cacheBinName === '') {
    cacheBinName = Object.keys(pkgInfo.bin)[0]
  }
  return cacheBinName
}
