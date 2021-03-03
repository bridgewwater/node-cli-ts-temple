import pkgInfo from '../../package.json'
import { binName } from '../utils/pkgInfo'

export interface NodeTemplate {
  templateUrl: string
  proxyTemplateUrl: string
  templateBranch: string
  templateProjectName: string
}

export interface AndroidJavaTemplate {
  templateUrl: string
  proxyTemplateUrl: string
  templateBranch: string
  templateProjectName: string
}

export interface ICfgSetting {
  name: string
  version: string
  nodeTemplate: NodeTemplate
  androidJavaTemplate: AndroidJavaTemplate
}

export const CfgSetting: ICfgSetting = {
  name: binName(),
  version: pkgInfo.version,
  nodeTemplate: {
    templateUrl: 'https://github.com/bridgewwater/node-cli-ts-temple.git',
    proxyTemplateUrl: '',
    templateBranch: 'main',
    templateProjectName: 'node-cli-ts-temple'
  },
  androidJavaTemplate: {
    templateUrl: 'https://github.com/bridgewwater/android-java-temple.git',
    proxyTemplateUrl: '',
    templateBranch: 'main',
    templateProjectName: 'android-java-temple'
  }
}
