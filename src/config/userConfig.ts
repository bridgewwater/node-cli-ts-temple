import { CfgSetting } from './cfgSetting';

const USER_HOME = process.env.HOME || process.env.USERPROFILE;
import path from 'path';
import fsExtra from 'fs-extra';
import pkgInfo from '../../package.json';
import extend from 'extend';

export const userConfigFolder = (): string => {
  let userHome = USER_HOME;
  if (!userHome){
    userHome = '~';
  }
  return path.join(userHome, `.${pkgInfo.name}`);
};

export const userConfigJsonPath = (): string => {
  return path.join(userConfigFolder(),`${pkgInfo.name}-cfg.json`)
};

export const initUserHomeConfig = (config?: any): void => {
  let configFolder = userConfigFolder();
  if (!fsExtra.existsSync(configFolder)){
    fsExtra.mkdirpSync(configFolder);
  }
  let configJsonPath = userConfigJsonPath();
  if (!fsExtra.existsSync(configJsonPath)) {
    if (!config) {
      config = CfgSetting
    }
    fsExtra.outputJsonSync(configJsonPath, config);
  }
};

export const loadUserHomeConfig = ():any => {
  if (!fsExtra.existsSync(userConfigJsonPath())){
    return null;
  }
  let userConfigJson = fsExtra.readJsonSync(userConfigJsonPath());
  extend(CfgSetting, userConfigJson)
  return userConfigJson
}

export const printUserHomeConfig = ():void => {
  console.log(loadUserHomeConfig().toString());
}