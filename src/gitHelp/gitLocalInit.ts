import { runCmd } from '../utils/cmdRunner'

export const initGitLocal = (initPath: string = process.cwd()): void => {
  runCmd({ cmd: 'git', args: ['init'], cwd: initPath, isStdio: true })
  runCmd({ cmd: 'git', args: ['add', '.'], cwd: initPath, isStdio: false })
  runCmd({
    cmd: 'git',
    args: ['commit', '-m', '"init commit"'],
    cwd: initPath,
    isStdio: false
  })
}
