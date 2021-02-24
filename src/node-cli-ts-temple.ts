import { Command } from 'commander'
import { binName, pkgInfo } from './utils/pkgInfo'
import { checkUpdate } from './utils/checkUpdate'
import { initUserHomeConfig, userConfigFolder } from './config/userConfig'
import { cleanUserHomeLogs, logDebug, noNoColor, openVerbose, verbose, writeLogsUser } from './nlog/nLog'
import { cliNodeTypeScriptCLICommand } from './biz/nodeTypeScriptMaker/nodeTSCommand'

const program = new Command(binName())

/**
 * initialization command
 */
export const initCommand = (): void => {
  initUserHomeConfig()

  program
    // .enablePositionalOptions()
    // .passThroughOptions()
    .option('-v, --verbose', 'output verbose')
    .on('option:verbose', (): void => {
      openVerbose()
      logDebug(`-> now debug ${verbose()}`)
    })
    .option('--no-color', '[+|-] close color cli out put', false)
    .on('option:no-color', (): void => {
      logDebug('option:no-color')
      noNoColor()
    })
    .option('--log', '[-|+] open log file out put', false)
    .on('option:log', (): void => {
      writeLogsUser()
    })
    .option('--clean-logs', '[+|-] clean logs', false)

  program.addCommand(cliNodeTypeScriptCLICommand())

  program.on('--help', () => {
    console.log(`\nUse: ${binName()} -h | [command] --help usage.\n`)
  })

  program
    .description(
      `description change name: ${binName()}\n
  global config path: ${userConfigFolder()}`
    )
    .version(`${binName()} ${pkgInfo.version}`, '--version', 'view version information')
    .helpOption('-h, --help', 'view help information')
    .usage('more information see child command')

  // No input parameters, the default help information is output in the terminal
  if (!process.argv.slice(2).length) {
    checkUpdate()
    program.outputHelp()
    return
  }

  program.on('option:clean-logs', (): void => {
    cleanUserHomeLogs()
    process.exit(0)
  })

  try {
    program.parse(process.argv)
  } catch (error) {
    program.outputHelp()
  }
}
