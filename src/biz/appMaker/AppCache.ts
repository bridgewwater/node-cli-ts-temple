import path from 'path'
import lodash from 'lodash'
import { userConfigFolder } from '../../config/userConfig'
import { logDebug } from '../../nlog/nLog'
import { AppMaker } from './AppMaker'
import fsExtra from 'fs-extra'
import { gitPullNotLog } from '../../gitHelp/gitPull'
import { ErrorAndExit } from '../../globalBiz'

interface IAppCache {
  cacheTemplate: () => void
}

export abstract class AppCache extends AppMaker implements IAppCache {

  cachePath: string

  cacheAlias: string


  protected constructor(name: string, alias: string, template: string, branch?: string) {
    super(name, template, branch)
    if (lodash.isEmpty(alias)) {
      ErrorAndExit(-128, 'alias must not empty')
    }
    this.cacheAlias = alias
    this.cachePath = path.resolve(path.join(userConfigFolder(), 'cache', alias))
  }

  cacheTemplate(): void {
    logDebug(`template ${this.template}
template branch: ${this.templateBranch}
cachePath path: ${this.cachePath}
`)
    const cacheFolder = path.dirname(this.cachePath)
    if (!fsExtra.existsSync(cacheFolder)) {
      fsExtra.mkdirpSync(cacheFolder)
    }

    if (fsExtra.existsSync(this.cachePath)) {
      const runGitPullReturn = gitPullNotLog(this.cachePath)
      if (runGitPullReturn.status) {
        ErrorAndExit(runGitPullReturn.status, `error [ git pull ] at path ${this.cachePath}`)
      }
    } else {
      this.downloadTemplate(cacheFolder, this.cacheAlias, false, false)
    }
  }
}