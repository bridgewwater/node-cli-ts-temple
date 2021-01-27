import { runCmd } from '../../utils/cmdRunner'
import { CMDType } from '../../utils/cmdType'
import { SpawnSyncReturns } from 'child_process'


export const installDependencies = (cmd: CMDType = 'npm', path: string = process.cwd()): SpawnSyncReturns<Buffer> => {
  return runCmd({ cmd, args: ['install'], cwd: path })
}