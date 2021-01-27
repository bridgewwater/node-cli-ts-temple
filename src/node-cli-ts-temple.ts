import { Command } from 'commander'
import { binName, pkgInfo } from './utils/pkgInfo'
import { checkUpdate } from './utils/checkUpdate'
import { createNodeApp } from './biz'
import { initUserHomeConfig, userConfigFolder } from './config/userConfig'
import { cleanUserHomeLogs, logDebug, noNoColor, openVerbose, verbose, writeLogsUser } from './nlog/nLog'

const program = new Command(binName())

/**
 * initialization command
 */
export const initCommand = (): void => {
  initUserHomeConfig()

  program
    .arguments('<appName>')
    .description(
      `description change name: ${binName()}\n
  global config path: ${userConfigFolder()}`
    )
    .option('-v, --verbose', 'output verbose')
    .on('option:verbose', (): void => {
      openVerbose()
      logDebug(`-> now debug ${verbose()}`)
    })
    .option('-t, --template <path>', 'template address, support git address and local path')
    .action((appName, cmd) => {
      checkUpdate()
      createNodeApp(appName, cmd.template)
    })
  program.option('--log', '[-|+] open log file out put', false).on('option:log', (): void => {
    writeLogsUser()
  })
  program.option('--no-color', '[+|-] close color cli out put', false).on('option:no-color', (): void => {
    logDebug('option:no-color')
    noNoColor()
  })
  program.option('--clean-logs', '[+|-] clean logs', false)

  program.on('--help', () => {
    console.log(`\nUse: ${binName()} -h | --help command usage.\n`)
  })

  program
    .version(`${binName()} ${pkgInfo.version}`, '--version', 'view version information')
    .helpOption('-h, --help', 'view help information')
    .usage('[path]')

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
