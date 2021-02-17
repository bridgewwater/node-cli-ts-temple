import { ICmdParams } from './ICmdParams'
import { spawnSync, SpawnSyncReturns } from 'child_process'
import { logDebug } from '../nlog/nLog'

/**
 * run cmd
 * @param args - args
 * @param cmd - cmd default is npm
 * @param cwd - path default process.cwd()
 * @param isStdio - spawnSync default inherit
 */
export const runCmd = ({
  args,
  cmd = 'npm',
  cwd = process.cwd(),
  isStdio = true
}: ICmdParams): SpawnSyncReturns<Buffer> => {
  logDebug(`-> runCmd isStdio ${isStdio} at path: ${cwd}\n run: ${cmd} ${args}`)
  return spawnSync(cmd, args, {
    cwd,
    stdio: isStdio ? 'inherit' : undefined,
    shell: true
  })
}
