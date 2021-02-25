import { ErrorAndExit } from '../../globalBiz'
import { ICmdParams } from '../../utils/ICmdParams'
import { logDebug, logInfo, logVerbose, logWarning } from '../../nlog/nLog'
import { CMDType } from '../../utils/cmdType'
import { runCmd } from '../../utils/cmdRunner'
import path from 'path'
import fsExtra from 'fs-extra'
import lodash from 'lodash'
import GitURLParse from 'git-url-parse'
import { isExistPathSync } from '../../utils/filePlus'
import { isPlatformWindows } from '../../utils/systemInfoUtils'

interface IAppMaker {
  // eslint-disable-next-line no-unused-vars
  downloadTemplate: (runCwd: string, alias: string, removeGit: boolean, removeCiConfig: boolean) => void
}

interface ICheckPrompt {
  itemName: string
  target: string
  canEmpty: boolean
  notAllowList?: string[]
}


export abstract class AppMaker implements IAppMaker {
  name = 'appMaker'

  template = ''

  templateBranch: string

  fullPath: string

  constructor(name: string, template: string, branch?: string) {
    this.name = name
    if (lodash.isEmpty(template)) {
      this.template = this.doDefaultTemplate()
    } else {
      this.template = template
    }
    if (branch) {
      this.templateBranch = branch
    } else {
      this.templateBranch = this.doDefaultTemplateBranch()
    }
    this.fullPath = path.resolve(path.join(process.cwd(), this.name))
  }

  // eslint-disable-next-line class-methods-use-this
  checkPrompts(checkPrompts: ICheckPrompt[]): boolean {
    let res = false
    if (checkPrompts.length > 0) {
      checkPrompts.forEach((val) => {
        if (!val.canEmpty) {
          if (lodash.isEmpty(val.target)) {
            logWarning(`error: not allowed [ ${val.itemName} ] empty`)
            res = true
          }
        }
        if (!lodash.isEmpty(val.target)) {
          if (val.notAllowList) {
            if (val.notAllowList.length > 0) {
              val.notAllowList.forEach((v) => {
                if (v === val.target) {
                  logWarning(`error: not allowed [ ${val.itemName} ] to be: ${v}`)
                  res = true
                }
              })
            }
          }
        }
      })
    }
    return res
  }

  downloadTemplate(runCwd = process.cwd(), alias: string,
    removeGit = true, removeCiConfig = true): void {
    if (!this.template || this.template === '') {
      ErrorAndExit(-127, 'template is empty')
      return
    }
    logInfo(`use template: ${this.template}`)
    const currentPath = runCwd
    let targetAlias = alias
    if (lodash.isEmpty(targetAlias)) {
      targetAlias = this.name
    }
    let runParams: ICmdParams = {
      cmd: 'git',
      args: ['clone', this.template, targetAlias, '--depth=1', '-b', this.templateBranch],
      cwd: runCwd
    }

    // local template, using copy
    const isGitTemplate = /\.git/.test(this.template)
    if (!isGitTemplate) {
      let cmd: CMDType = 'cp'
      let args = [this.template, currentPath, '/e', '/xd', 'node_modules']

      if (isPlatformWindows()) {
        cmd = 'robocopy'
        args = [this.template, currentPath]
      }

      runParams = {
        cmd,
        args
      }
    }

    logVerbose('\n-> template clone start...\n')
    const runCmdReturn = runCmd({
      ...runParams,
      isStdio: true
    })
    if (runCmdReturn.status) {
      ErrorAndExit(runCmdReturn.status, `error at: ${runParams.cmd} ${runParams.args}`)
    }
    logVerbose('\n-> template clone complete...\n')

    const targetPath = path.join(currentPath, targetAlias)
    // remove existing git records

    if (removeGit) {
      fsExtra.removeSync(path.join(targetPath, '.git'))
      logDebug(`remove .git at path: ${targetPath}`)
    }
    // remove git action set if has
    if (removeCiConfig) {
      this.doRemoveCiConfig(targetPath)
    }
  }

  parseTemplateSource(): string {
    const gitURLParse = GitURLParse(this.template)
    return `${gitURLParse.source}`
  }

  parseTemplateOwnerAndName(): string {
    const gitURLParse = GitURLParse(this.template)
    return `${gitURLParse.owner}/${gitURLParse.name}`
  }

  parseTemplateRepoUrl(): string {
    const gitURLParse = GitURLParse(this.template)
    return `${gitURLParse.source}/${gitURLParse.owner}/${gitURLParse.name}`
  }

  parseTemplateGitUrl(): string {
    const gitURLParse = GitURLParse(this.template)
    return `${gitURLParse.protocol}://${gitURLParse.source}/${gitURLParse.owner}/${gitURLParse.name}`
  }

  doCheckAppPath(): boolean {
    if (isExistPathSync(this.fullPath)) {
      logWarning(`Warn: new project path already exists in the current directory at: ${this.fullPath}`)
      return false
    }
    return true
  }

  abstract onPreCreateApp(): Promise<void>

  abstract onCreateApp(): Promise<void>

  abstract onPostCreateApp(): Promise<void>

  abstract doDefaultTemplate(): string

  abstract doDefaultTemplateBranch(): string

  // eslint-disable-next-line no-unused-vars
  abstract doRemoveCiConfig(workPath: string): void

  async execute(): Promise<void> {
    await this.onPreCreateApp()
  }
}

