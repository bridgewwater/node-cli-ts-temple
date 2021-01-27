import updateNotifier from 'update-notifier'
import pkg from '../../package.json'

/**
 * 检查更新
 */
export const checkUpdate = (): void => {
  updateNotifier({ pkg }).notify()
}
