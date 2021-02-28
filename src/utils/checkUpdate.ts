import updateNotifier from 'update-notifier'
import packageJsom from '../../package.json'
import chalk from 'chalk'

/**
 * check cli update
 */
export const checkUpdate = (): void => {
  const notifier = updateNotifier({
    pkg: {
      name: packageJsom.name,
      version: packageJsom.version
    },
    updateCheckInterval: 0 // close check interval
    // updateCheckInterval: 1000 * 60 * 60 * 24 // 1 day
    // updateCheckInterval: 1000 * 60 * 60 * 24 * 7 // 1 week
  })
  // notifier.notify({ message: 'Run `{updateCommand}` to update.' })
  notifier.notify({ message: 'Run `{updateCommand} -g` to update.' })
  if (notifier.update) {
    console.log(chalk.yellow(`Latest version available: ${notifier.update.latest} , please update`))
  }
}
