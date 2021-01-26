import inquirer from 'inquirer';
import path from 'path';
import chalk from 'chalk';
import { pkgInfo } from './utils/pkgInfo';
import { isExistPath } from './utils/filePlus';
import {downloadTemplate} from './templatedownload/downloadTemplate';
import { verbose } from './config/RunMode';

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
];

/**
 * Initialize command prompt
 */
const initPrompt = (name: string, template: string) => {
  inquirer.prompt(prompts).then(({ git, selectInstall }) => {
    const fullPath = path.join(process.cwd(), name);
    downloadTemplate(name, template);
    // installDependencie(selectInstall, fullPath)

    if (git) {
      // initGit(fullPath)
    }

    // initComplate()
  });
};



/**
 * new project
 * @param name - project name
 * @param template - Template address. git or local path
 */
export const createApp = (name: string, template: string): void => {
  const fullPath = `${process.cwd()}/${name}`;

  if (isExistPath(fullPath)) {
    console.log(`${chalk.cyan(name)} already exists in the current directory`);
    return;
  }

  console.clear(); // clear the console
  process.stdout.write(
    chalk.bold.cyan(`${pkgInfo.name} v${pkgInfo.version}\n`),
    'utf-8'
  );
  initPrompt(name, template);
};