import pkgInfo from '../../package.json'

export interface NodeTemplate {
  templateUrl: string
}

export interface ICfgSetting {
  name: string
  version: string
  nodeTemplate: NodeTemplate
}

export const CfgSetting: ICfgSetting = {
  name: pkgInfo.name,
  version: pkgInfo.version,
  nodeTemplate: {
    templateUrl: 'https://github.com/bridgewwater/node-cli-ts-temple.git'
  }
}
