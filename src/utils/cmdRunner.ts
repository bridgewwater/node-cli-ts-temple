import { ICmdParams } from './ICmdParams'
import { spawnSync, SpawnSyncReturns } from 'child_process'
import { logDebug, logError } from '../nlog/nLog'
import fs from 'fs'

/**
 * run cmd
 * @param args - args
 * @param cmd - cmd default is npm
 * @param cwd - path default process.cwd()
 * @param isStdio - spawnSync default inherit
 */
export const runCmd = ({
  cmd = 'npm',
  args,
  cwd = process.cwd(),
  isStdio = true
}: ICmdParams): SpawnSyncReturns<Buffer> => {
  logDebug(`-> runCmd isStdio ${isStdio} at path: ${cwd}\n run: ${cmd} ${args}`)
  if (!fs.existsSync(cwd)) {
    logError(`-> runCmd cwd not exists: ${cwd}`)
  }
  return spawnSync(cmd, args, {
    cwd,
    stdio: isStdio ? 'inherit' : undefined,
    shell: true
  })
}
