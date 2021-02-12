import commander, { Command } from 'commander'
import { checkUpdate } from '../../utils/checkUpdate'
import { binName } from '../../utils/pkgInfo'
import { NodeTSCLIMaker } from './NodeTSCLIMaker'


export const cliNodeTypeScriptCLICommand = (): commander.Command => {
  const build = new Command('node-ts-cli')
  build
    .arguments('<appName>')
    .option('-t, --template <path>', 'template address, support git address and local path')
    .action(async (appName, cmd) => {
      checkUpdate()
      const nodeTSCLIMaker = new NodeTSCLIMaker(appName, cmd.template)
      await nodeTSCLIMaker.execute()
    })
    .usage('[options] <appName>')
    .description(`clone and build project, as: ${binName()} build appName`)
  return build
}