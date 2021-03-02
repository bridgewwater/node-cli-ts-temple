import { CfgSetting, ICfgSetting, NodeTemplate } from './cfgSetting'

const USER_HOME = process.env.HOME || process.env.USERPROFILE
import path from 'path'
import fsExtra from 'fs-extra'
import extend from 'extend'
import { logDebug, logInfo } from '../nlog/nLog'
import { binName, pkgInfo } from '../utils/pkgInfo'
import semver from 'semver'
import chalk from 'chalk'
import lodash from 'lodash'

export const userConfigFolder = (): string => {
  let userHome = USER_HOME
  if (!userHome) {
    userHome = '~'
  }
  return path.join(userHome, `.${binName()}`)
}

export const userConfigCacheFolder = (): string => {
  let userHome = USER_HOME
  if (!userHome) {
    userHome = '~'
  }
  return path.join(userConfigFolder(), 'cache')
}

export const userConfigJsonPath = (): string => {
  return path.join(userConfigFolder(), `${binName()}-cfg.json`)
}

function initDefaultConfigOfSetting(configJsonPath: string, config: ICfgSetting | undefined) {
  let configData = CfgSetting
  if (config) {
    configData = config
  }
  fsExtra.outputJsonSync(configJsonPath, configData, {
    replacer: null,
    spaces: '\t'
  })
}

function checkConfigUpdate(configJsonPath: string, config: ICfgSetting | undefined) {
  const userConfigJson = fsExtra.readJsonSync(configJsonPath)
  if (semver.gt(pkgInfo.version, userConfigJson.version)) {
    const bakConfigJson = `${configJsonPath}.${userConfigJson.version}.bak`
    console.log(chalk.yellow(`=> config need update at: ${configJsonPath}`))
    fsExtra.copyFileSync(configJsonPath, bakConfigJson)
    console.log(chalk.yellow(`-> back old config at: ${bakConfigJson}`))
    initDefaultConfigOfSetting(configJsonPath, config)
  }
}

export const initUserHomeConfig = (config?: ICfgSetting): void => {
  const configFolder = userConfigFolder()
  if (!fsExtra.existsSync(configFolder)) {
    fsExtra.mkdirpSync(configFolder)
  }
  const configJsonPath = userConfigJsonPath()

  if (!fsExtra.existsSync(configJsonPath)) {
    initDefaultConfigOfSetting(configJsonPath, config)
  } else {
    checkConfigUpdate(configJsonPath, config)
  }
}

export const loadUserHomeConfig = (): ICfgSetting => {
  if (!fsExtra.existsSync(userConfigJsonPath())) {
    return CfgSetting
  }
  const userConfigJson = fsExtra.readJsonSync(userConfigJsonPath())
  extend(CfgSetting, userConfigJson)
  return userConfigJson
}

export const printUserHomeConfig = (): void => {
  logDebug(loadUserHomeConfig()?.toString())
}

export const nodeTemplate = (): NodeTemplate => {
  return loadUserHomeConfig().nodeTemplate
}

export const androidJavaTemplate = (): NodeTemplate => {
  return loadUserHomeConfig().androidJavaTemplate
}

const removeProxyCacheByAlias = (alias: string) => {
  const proxyCachePath = path.join(userConfigCacheFolder(), `${alias}-proxy`)
  if (fsExtra.existsSync(proxyCachePath)) {
    fsExtra.removeSync(proxyCachePath)
    console.log(chalk.yellow(`-> remove ${alias} proxy at: ${proxyCachePath}`))
  }
}

export const writeProxyNodeTemplate = (proxyTemplate: string, alias: string): void => {
  logInfo(`-> now set proxyTemplate: ${proxyTemplate}`)
  const nowConfig = loadUserHomeConfig()
  nowConfig.nodeTemplate.proxyTemplateUrl = proxyTemplate
  fsExtra.outputJsonSync(userConfigJsonPath(), nowConfig, {
    replacer: null,
    spaces: '\t'
  })
  if (lodash.isEmpty(proxyTemplate)) {
    removeProxyCacheByAlias(alias)
  }
}
