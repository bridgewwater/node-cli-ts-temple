import chalk from 'chalk'

/**
 * check Node
 */
export const checkNodeVersion = (): void => {
  const currentVersion = process.versions.node
  const major = Number(currentVersion.split('.')[0])

  if (major < 10) {
    console.log(`Now Node version:\n\n\t${currentVersion}\n
${chalk.red('cli need Node 10, please update your node version')}`)
    process.exit(1)
  }
}
