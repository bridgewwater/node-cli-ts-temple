import inquirer from 'inquirer'
import path from 'path'
import GitURLParse from 'git-url-parse'
import { isExistPath } from './utils/filePlus'
import { downloadTemplate } from './gitHelp/downloadTemplate'
import { nodeTemplate } from './config/userConfig'
import { initGitLocal } from './gitHelp/gitLocalInit'
import { installDependencies } from './language/node/nodeInstallDependencie'
import { ProjectInitComplete, WarnToSafeExit } from './globalBiz'
import { logDebug, logInfo } from './nlog/nLog'

/**
 * command prompt
 */
const prompts = [
  {
    type: 'confirm',
    name: 'git',
    message: 'Initialize git？',
    default: false
  },
  {
    type: 'list',
    name: 'selectInstall',
    message: 'how to install dependencies',
    default: 'npm',
    choices: [
      {
        name: 'ues npm',
        value: 'npm'
      },
      {
        name: 'use yarn',
        value: 'yarn'
      }
    ]
  }
]

/**
 * Initialize command prompt
 */
const initPrompt = (name: string, template: string) => {
  // logDebug(`select command prompt start ${isLogFile()}`)
  inquirer.prompt(prompts).then(({ git, selectInstall }) => {
    // logDebug(`select command prompt finish ${isLogFile()}`)
    const fullPath = path.resolve(path.join(process.cwd(), name))

    downloadTemplate(name, template)
    installDependencies(selectInstall, fullPath)

    if (git) {
      logDebug(`initGitLocal at: ${fullPath}`)
      initGitLocal(fullPath)
    }

    ProjectInitComplete()
  })
}

/**
 * new project
 * @param name - project nameN
 * @param template - Template address. git or local path
 */
export const createNodeApp = (name: string, template?: string): void => {
  const fullPath = path.resolve(path.join(process.cwd(), name))

  if (isExistPath(fullPath)) {
    WarnToSafeExit(`Warn: new project path already exists in the current directory at: ${name}`)
    return
  }
  let nodeTemplateURL = nodeTemplate().templateUrl as string
  if (template != null) {
    nodeTemplateURL = template
  }

  const gitURLParse = GitURLParse(nodeTemplateURL)
  const templateHttpURL = `${gitURLParse.protocol}://${gitURLParse.source}/${gitURLParse.owner}/${gitURLParse.name}`

  // console.clear() // clear the console
  logInfo(`create node project from template: ${templateHttpURL}`)
  // process.stdout.write(chalk.bold.cyan(`create node project from template: ${templateHttpURL}\n`), 'utf-8')
  initPrompt(name, nodeTemplateURL)
}
