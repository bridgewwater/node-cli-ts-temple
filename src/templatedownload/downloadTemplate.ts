import fsExtra from 'fs-extra'
import { ICmdParams } from '../utils/ICmdParams'
import { CMDType } from '../utils/cmdType'
import { run } from '../utils/cmdRunner'
import { nodeTemplate } from '../config/userConfig'
import { verbose } from '../config/RunMode'

/**
 * download template
 * @param name - project name
 * @param template - template path default:
 */
export const downloadTemplate = (name: string, template = nodeTemplate().templateUrl): void => {
  const isGitTemplate = /\.git/.test(template)
  const currentPath = process.cwd()
  let runParams: ICmdParams = {
    cmd: 'git',
    args: ['clone', template, name]
  }

  if (verbose()) {
    console.log(`clone template: ${template}`)
  }

  // 本地路径，采用复制的方式
  if (!isGitTemplate) {
    let cmd: CMDType = 'cp'
    let args = [template, currentPath, '/e', '/xd', 'node_modules']

    if (process.platform === 'win32') {
      cmd = 'robocopy'
      args = [template, currentPath]
    }

    runParams = {
      cmd,
      args
    }
  }

  console.log('\ntemplate downloading...')
  run({
    ...runParams,
    isStdio: true
  })
  console.log('template download complete. \n')

  // remove existing git records
  fsExtra.removeSync(`${currentPath}/${name}/.git`)
  run({ cmd: 'rm', args: ['-rf', '.git'], cwd: `${currentPath}/${name}` })
}
