import path from 'path'
import lodash from 'lodash'
import { userConfigCacheFolder } from '../../config/userConfig'
import { logInfo } from '../../nlog/nLog'
import { AppMaker } from './AppMaker'
import fsExtra from 'fs-extra'
import { gitPullNotLog } from '../../gitHelp/gitPull'
import { ErrorAndExit } from '../../globalBiz'

interface IAppCache {
  // eslint-disable-next-line no-unused-vars
  cacheTemplate: (useProxyTemplateUrl: boolean) => void
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
    this.cachePath = path.resolve(userConfigCacheFolder(), alias)
  }

  cacheTemplate(useProxyTemplateUrl: boolean): void {
    // let finalCachePath = this.cachePath
    // let finalCacheAlias = this.cacheAlias
    if (useProxyTemplateUrl) {
      this.cachePath = `${this.cachePath}-proxy`
      this.cacheAlias = `${this.cacheAlias}-proxy`
    }
    logInfo(`=> cache template ${this.template}
useProxyTemplateUrl: ${useProxyTemplateUrl}
template branch: ${this.templateBranch}
cachePath path: ${this.cachePath}
\tIf cache error, please remove cache and retry
`)
    const cacheFolder = path.dirname(this.cachePath)
    if (!fsExtra.existsSync(cacheFolder)) {
      fsExtra.mkdirpSync(cacheFolder)
    }

    if (fsExtra.existsSync(this.cachePath)) {
      logInfo(`-> check cache update at: ${this.cachePath}\nPlease wait...`)
      const runGitPullReturn = gitPullNotLog(this.cachePath)
      if (runGitPullReturn.status) {
        ErrorAndExit(runGitPullReturn.status, `error [ git pull ] at path ${this.cachePath}`)
      }
    } else {
      logInfo(`-> download cache at: ${this.cachePath}\nPlease wait...`)
      this.downloadTemplate(cacheFolder, this.cacheAlias, useProxyTemplateUrl, false, false)
    }
  }
}