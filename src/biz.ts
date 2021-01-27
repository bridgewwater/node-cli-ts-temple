import inquirer from 'inquirer'
import path from 'path'
import chalk from 'chalk'
import { isExistPath } from './utils/filePlus'
import { downloadTemplate } from './templatedownload/downloadTemplate'
import { logWarning } from './nlog/nLog'
import { run } from './utils/cmdRunner'
import { force } from './config'
import { nodeTemplate } from './config/userConfig'
import GitURLParse from 'git-url-parse'

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
        name: 'use yarn',
        value: 'yarn'
      },
      {
        name: 'ues npm',
        value: 'npm'
      }
    ]
  }
]

const initGit = (initPath: string = process.cwd()) => {
  run({ cmd: 'git', args: ['init'], cwd: initPath, isStdio: false })
  run({ cmd: 'git', args: ['add', '.'], cwd: initPath, isStdio: false })
  run({
    cmd: 'git',
    args: ['commit', '-m', '"init commit"'],
    cwd: initPath,
    isStdio: false
  })
}

/**
 * Initialize command prompt
 */
const initPrompt = (name: string, template: string) => {
  inquirer.prompt(prompts).then(({ git, selectInstall }) => {
    const fullPath = path.resolve(path.join(process.cwd(), name))
    if (!force()) {
      return
    }

    downloadTemplate(name, template)
    // installDependencie(selectInstall, fullPath)

    if (git) {
      initGit(fullPath)
    }

    // initComplate()
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
    logWarning(`Warn: already exists in the current directory at: ${name}`)
    return
  }
  let nodeTemplateURL = nodeTemplate().templateUrl as string
  if (template != null) {
    nodeTemplateURL = template
  }

  const gitURLParse = GitURLParse(nodeTemplateURL)
  const templateHttpURL = `${gitURLParse.protocol}://${gitURLParse.source}/${gitURLParse.owner}/${gitURLParse.name}`

  console.clear() // clear the console
  process.stdout.write(chalk.bold.cyan(`create node project from template: ${templateHttpURL}\n`), 'utf-8')
  initPrompt(name, nodeTemplateURL)
}
