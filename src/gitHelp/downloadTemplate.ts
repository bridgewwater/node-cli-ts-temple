import fsExtra from 'fs-extra'
import { ICmdParams } from '../utils/ICmdParams'
import { CMDType } from '../utils/cmdType'
import { runCmd } from '../utils/cmdRunner'
import { nodeTemplate } from '../config/userConfig'
import { logInfo } from '../nlog/nLog'
import path from 'path'

/**
 * download template
 * @param name - project name
 * @param template - template path default: config nodeTemplate.templateUrl
 * @param removeGitAction remove gitAction set default: true
 */
export const downloadTemplate = (name: string, template = nodeTemplate().templateUrl, removeGitAction = true): void => {
  const isGitTemplate = /\.git/.test(template)
  const currentPath = process.cwd()
  let runParams: ICmdParams = {
    cmd: 'git',
    args: ['clone', template, name]
  }

  logInfo(`clone template: ${template}`)

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

  console.log('\n-> template downloading...\n')
  runCmd({
    ...runParams,
    isStdio: true
  })
  console.log('\n-> template download complete.\n')

  const targetPath = path.join(currentPath, name)

  // remove existing git records
  fsExtra.removeSync(path.join(currentPath, '.git'))
  // remove git action set if has
  if (removeGitAction) {
    if (fsExtra.existsSync(path.join(targetPath, '.github'))) {
      fsExtra.removeSync(path.join(targetPath, '.github'))
    }
  }
}
