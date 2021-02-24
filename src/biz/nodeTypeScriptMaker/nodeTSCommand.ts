import commander, { Command } from 'commander'
import { checkUpdate } from '../../utils/checkUpdate'
import { binName } from '../../utils/pkgInfo'
import { NodeTSCLIMaker } from './NodeTSCLIMaker'


export const cliNodeTypeScriptCLICommand = (): commander.Command => {
  const build = new Command('node-ts-cli')
  build
    .arguments('<targetName>')
    .option('-t, --template <path>', 'template address, support git address and local path')
    .action(async (targetName, cmd) => {
      checkUpdate()
      const nodeTSCLIMaker = new NodeTSCLIMaker(targetName, cmd.template)
      await nodeTSCLIMaker.execute()
    })
    .usage('[options] <targetName>')
    .description(`clone and build project, as: ${binName()} node-ts-cli targetName`)
  return build
}