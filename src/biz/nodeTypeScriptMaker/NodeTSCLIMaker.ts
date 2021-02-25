import { AppMaker } from '../appMaker/AppMaker'
import { nodeTemplate } from '../../config/userConfig'
import path from 'path'
import fsExtra from 'fs-extra'
import { logDebug, logInfo } from '../../nlog/nLog'
import { ErrorAndExit, ProjectInitComplete } from '../../globalBiz'
import inquirer from 'inquirer'
import { initGitLocal } from '../../gitHelp/gitLocalInit'
import { installNodeDependencies } from '../../language/node/nodeInstallDependencie'

export class NodeTSCLIMaker extends AppMaker {

  prompts = [
    {
      type: 'confirm',
      name: 'git',
      message: 'Initialize git？',
      default: false
    },
    {
      type: 'list',
      name: 'selectInstall',
      message: 'how to install dependencies',
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
  doRemoveCiConfig(workPath: string): void {
    if (fsExtra.existsSync(path.join(workPath, '.github'))) {
      fsExtra.removeSync(path.join(workPath, '.github'))
      logDebug(`remove git action at path: ${workPath}`)
    }
  }

  async onCreateApp(): Promise<void> {
    inquirer.prompt(this.prompts).then(({ git, selectInstall }) => {
      this.downloadTemplate(process.cwd(), this.name)
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