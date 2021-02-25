import { SpawnSyncReturns } from 'child_process'
import { logDebug } from '../nlog/nLog'
import { runCmd } from '../utils/cmdRunner'

export const gitPullNotLog = (path: string = process.cwd()): SpawnSyncReturns<Buffer> => {
  logDebug(`cli: git pull at: ${path}`)
  return runCmd({
    cmd: 'git',
    args: ['pull', '--no-log'],
    cwd: path
  })
}
