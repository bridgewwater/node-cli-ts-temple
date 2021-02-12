import { runCmd } from '../../utils/cmdRunner'
import { CMDType } from '../../utils/cmdType'
import { SpawnSyncReturns } from 'child_process'
import { logDebug } from '../../nlog/nLog'


export const installNodeDependencies = (
  cmd: CMDType = 'npm',
  path: string = process.cwd()): SpawnSyncReturns<Buffer> => {
  logDebug(`install dependencies at: ${path}`)
  return runCmd({ cmd, args: ['install'], cwd: path })
}