import updateNotifier from 'update-notifier'
import pkg from '../../package.json'

/**
 * check cli update
 */
export const checkUpdate = (): void => {
  const notifier = updateNotifier({ pkg })
  notifier.notify({ message: 'Run `{updateCommand}` to update.' })
  if (notifier.update) {
    console.log(notifier.update)
  }
}
