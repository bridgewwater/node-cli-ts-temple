import { CfgSetting, ICfgSetting, NodeTemplate } from './cfgSetting'

const USER_HOME = process.env.HOME || process.env.USERPROFILE
import path from 'path'
import fsExtra from 'fs-extra'
import extend from 'extend'
import { logDebug } from '../nlog/nLog'
import { binName, pkgInfo } from '../utils/pkgInfo'
import semver from 'semver'
import chalk from 'chalk'

export const userConfigFolder = (): string => {
  let userHome = USER_HOME
  if (!userHome) {
    userHome = '~'
  }
  return path.join(userHome, `.${binName()}`)
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

export const nodeTemplate = (): NodeTemplate => {
  return loadUserHomeConfig().nodeTemplate
}

export const androidTemplate = (): NodeTemplate => {
  return loadUserHomeConfig().androidTemplate
}

export const printUserHomeConfig = (): void => {
  logDebug(loadUserHomeConfig()?.toString())
}
