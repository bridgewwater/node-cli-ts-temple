import pkgInfo from '../../package.json'
import { binName } from '../utils/pkgInfo'

export interface NodeTemplate {
  templateUrl: string
  proxyTemplateUrl: string
  templateBranch: string
}

export interface AndroidTemplate {
  templateUrl: string
  proxyTemplateUrl: string
  templateBranch: string
}

export interface ICfgSetting {
  name: string
  version: string
  nodeTemplate: NodeTemplate
  androidTemplate: AndroidTemplate
}

export const CfgSetting: ICfgSetting = {
  name: binName(),
  version: pkgInfo.version,
  nodeTemplate: {
    templateUrl: 'https://github.com/bridgewwater/bridgewwater-cli.git',
    proxyTemplateUrl: '',
    templateBranch: 'main'
  },
  androidTemplate: {
    templateUrl: 'https://github.com/bridgewwater/android-java-temple.git',
    proxyTemplateUrl: '',
    templateBranch: 'main'
  }
}
