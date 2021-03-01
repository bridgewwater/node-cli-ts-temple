import commander, { Command } from 'commander'
import { checkUpdate } from '../../utils/checkUpdate'
import { binName } from '../../utils/pkgInfo'
import { NodeTSCLIMaker } from './NodeTSCLIMaker'
import { nodeTemplate, writeProxyNodeTemplate } from '../../config/userConfig'
import { ExitZeroByHelp } from '../../globalBiz'
import { logWarning } from '../../nlog/nLog'


export const cliNodeTypeScriptCLICommand = (): commander.Command => {
  const build = new Command('node-ts-cli')
  build
    .option('-t, --template <path>', 'template address, support git address and local path')
    .option('--printProxyTemplate', 'show proxy template')
    .on('option:printProxyTemplate', (): void => {
      checkUpdate()
      console.log(`-> now proxy template: ${nodeTemplate().proxyTemplateUrl}`)
      ExitZeroByHelp()
    })
    .option('-p, --proxyTemplate <path>', 'set proxy template, close use --proxyTemplate ""')
    .on('option:proxyTemplate', (cmd): void => {
      checkUpdate()
      if (!cmd) {
        logWarning('Warning: will close use proxyTemplate')
      }
      writeProxyNodeTemplate(cmd, 'node-ts-cli')
      ExitZeroByHelp()
    })
    .arguments('<appName>')
    .action(async (appName, cmd) => {
      checkUpdate()
      const nodeTSCLIMaker = new NodeTSCLIMaker(appName, cmd.template)
      await nodeTSCLIMaker.execute()
    })
    .usage('[options] <appName>')
    .description(`clone and build project, as: ${binName()} build appName`)
  return build
}