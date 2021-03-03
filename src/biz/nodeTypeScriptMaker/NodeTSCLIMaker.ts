import { AppMaker } from '../appMaker/AppMaker'
import { nodeTemplate } from '../../config/userConfig'
import path from 'path'
import fsExtra from 'fs-extra'
import { logDebug, logInfo, logVerbose } from '../../nlog/nLog'
import { ErrorAndExit, ProjectInitComplete } from '../../globalBiz'
import inquirer from 'inquirer'
import { initGitLocal } from '../../gitHelp/gitLocalInit'
import { installNodeDependencies } from '../../language/node/nodeInstallDependencie'
import lodash from 'lodash'
import { TypeScriptProjectRefactor } from '../../language/node/TypeScriptProjectRefactor'

export class NodeTSCLIMaker extends AppMaker {

  prompts = [
    {
      type: 'input',
      name: 'projectRepoURL',
      message: `new project git path [${this.parseTemplateRepoUrl()}]?`,
      default: this.parseTemplateRepoUrl()
    },
    {
      type: 'confirm',
      name: 'git',
      message: 'Initialize git？',
      default: false
    },
    {
      type: 'list',
      name: 'selectInstall',
      message: 'how to install dependencies:',
      default: 'npm',
      choices: [
        {
          name: 'ues npm',
          value: 'npm'
        },
        {
          name: 'use yarn',
          value: 'yarn'
        }
      ]
    }
  ]

  // eslint-disable-next-line class-methods-use-this
  doDefaultTemplate(): string {
    return nodeTemplate().templateUrl
  }

  // eslint-disable-next-line class-methods-use-this
  doDefaultTemplateBranch(): string {
    return nodeTemplate().templateBranch
  }

  // eslint-disable-next-line class-methods-use-this
  doProxyTemplateBranch(): string {
    return nodeTemplate().proxyTemplateUrl
  }

  // eslint-disable-next-line class-methods-use-this
  doRemoveCiConfig(workPath: string): void {
    if (fsExtra.existsSync(path.join(workPath, '.github'))) {
      fsExtra.removeSync(path.join(workPath, '.github'))
      logDebug(`remove git action at path: ${workPath}`)
    }
  }

  async onCreateApp(): Promise<void> {
    if (!lodash.isEmpty(nodeTemplate().proxyTemplateUrl)) {
      this.prompts.splice(0, 0, {
        type: 'confirm',
        name: 'useProxyTemplateUrl',
        message: `use proxyTemplateUrl: [ ${nodeTemplate().proxyTemplateUrl} ] ?`,
        default: false
      })
    }
    inquirer.prompt(this.prompts).then(({
      projectRepoURL,
      useProxyTemplateUrl,
      git, selectInstall
    }) => {
      const checkPrompts = [
        {
          itemName: 'projectRepoURL',
          target: projectRepoURL,
          canEmpty: false
        }
      ]
      if (this.checkPrompts(checkPrompts)) {
        ErrorAndExit(-127, 'please check error above')
      }
      logVerbose(`generating project
project repo: ${projectRepoURL}`)
      logDebug(`generating project
template project repo: ${this.parseTemplateRepoUrl()}
template project Name: ${nodeTemplate().templateProjectName}`)
      this.downloadTemplate(process.cwd(), this.name, useProxyTemplateUrl)
      // remove package-lock.json
      const packageLockJsonPath = path.join(this.fullPath, 'package-lock.json')
      if (fsExtra.existsSync(packageLockJsonPath)) {
        logDebug(`-> remove package-lock.json at: ${packageLockJsonPath}`)
      }
      const typeScriptProjectRefactor = new TypeScriptProjectRefactor(this.fullPath)
      typeScriptProjectRefactor.renameByFileString(this.parseTemplateRepoUrl(), projectRepoURL)
      logDebug(`renameByFileTextLineByLine: from ${nodeTemplate().templateProjectName}
to: ${this.name}`)
      typeScriptProjectRefactor.renameByFileTextLineByLine(nodeTemplate().templateProjectName, this.name)
      typeScriptProjectRefactor.renameTsFileName(nodeTemplate().templateProjectName, this.name, '.ts')
      installNodeDependencies(selectInstall, this.fullPath)
      if (git) {
        initGitLocal(this.fullPath)
        logInfo(`initGitLocal at: ${this.fullPath}`)
      }
      this.onPostCreateApp()
    })
  }

  async onPreCreateApp(): Promise<void> {
    if (!this.doCheckAppPath()) {
      ErrorAndExit(-127, `Error: can not new project path at: ${this.fullPath}`)
    }
    logInfo(`ready create node-typescript-cli project from template: ${this.parseTemplateGitUrl()}`)
    await this.onCreateApp()
  }

  async onPostCreateApp(): Promise<void> {
    logInfo(`finish: create node-typescript-cli at: ${this.fullPath}`)
    ProjectInitComplete()
  }
}