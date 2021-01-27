import pkgInfo from '../../package.json'
import { binName } from '../utils/pkgInfo'

export interface NodeTemplate {
  templateUrl: string
}

export interface ICfgSetting {
  name: string
  version: string
  nodeTemplate: NodeTemplate
}

export const CfgSetting: ICfgSetting = {
  name: binName(),
  version: pkgInfo.version,
  nodeTemplate: {
    templateUrl: 'https://github.com/bridgewwater/node-cli-ts-temple.git'
  }
}
