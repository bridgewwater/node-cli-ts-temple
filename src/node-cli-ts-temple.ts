import { Command } from 'commander';
import { pkgInfo } from './utils/pkgInfo';
import { checkUpdate } from './utils/checkUpdate';
import { createApp } from './biz';
import { initUserHomeConfig, loadUserHomeConfig } from './config/userConfig';
import { open_verbose, verbose } from './config/RunMode';

const program = new Command(pkgInfo.name);

/**
 * initialization command
 */
export const initCommand = (): void => {

  initUserHomeConfig();

  program
    .arguments('<appName>')
    .description(`description change name: ${pkgInfo.name}`)
    .option('--verbose', 'output verbose')
    .on('option:verbose', function () {
      open_verbose();
      console.log(`now debug ${verbose()}`);
    })
    .option('-t, --template <path>', 'template address, support git address and local path')
    .action((appName, cmd) => {
      checkUpdate();
      createApp(appName, cmd.template);
    });

  program.on('--help', () => {
    console.log(`\nRun: ${pkgInfo.name} -h | --help command usage.\n`);
  });

  program
    .version(`${pkgInfo.name} ${pkgInfo.version}`, '-v, --version', 'view version information')
    .helpOption('-h, --help', 'view help information')
    .usage('[path]');

  // No input parameters, the default help information is output in the terminal
  if (!process.argv.slice(2).length) {
    checkUpdate();
    program.outputHelp();
    return;
  }

  try {
    program.parse(process.argv);
  } catch (error) {
    program.outputHelp();
  }
};