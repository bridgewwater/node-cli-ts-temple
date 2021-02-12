import { CfgSetting, ICfgSetting, NodeTemplate } from './cfgSetting'

const USER_HOME = process.env.HOME || process.env.USERPROFILE
import path from 'path'
import fsExtra from 'fs-extra'
import extend from 'extend'
import { logDebug } from '../nlog/nLog'
import { binName } from '../utils/pkgInfo'

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

export const initUserHomeConfig = (config?: ICfgSetting): void => {
  const configFolder = userConfigFolder()
  if (!fsExtra.existsSync(configFolder)) {
    fsExtra.mkdirpSync(configFolder)
  }
  const configJsonPath = userConfigJsonPath()
  if (!fsExtra.existsSync(configJsonPath)) {
    let configData = CfgSetting
    if (config) {
      configData = config
    }
    fsExtra.outputJsonSync(configJsonPath, configData, {
      replacer: null,
      spaces: '\t'
    })
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
