import pkgInfo from '../../package.json'
import chalk from 'chalk'
import log4js from 'log4js'
import path from 'path'
import moment from 'moment'
import fsExtra from 'fs-extra'

const noColor = new chalk.Instance({ level: 0 })
let isNoColor = false
let isNoLogFile = true
let isVerbose = false

const USER_HOME = process.env.HOME || process.env.USERPROFILE
const userConfigFolder = (): string => {
  let userHome = USER_HOME
  if (!userHome) {
    userHome = '~'
  }
  return path.join(userHome, `.${pkgInfo.name}`)
}
const userLoggerFolder = (): string => {
  return path.join(userConfigFolder(), 'logs')
}

export const writeLogsUser = (level?: string): void => {
  let logLevel = 'debug'
  if (level) {
    logLevel = level
  }
  const logFileFullPath = path.join(
    userLoggerFolder(),
    `${pkgInfo.name}-${moment(new Date(), moment.defaultFormat).format('YYYY-MM-DD-HH-mm')}.log`
  )
  log4js.configure({
    appenders: {
      'node-cli-ts-temple': {
        type: 'file',
        filename: logFileFullPath
      }
    },
    categories: {
      default: {
        appenders: ['node-cli-ts-temple'],
        level: logLevel
      }
    }
  })
  isNoLogFile = false
  console.log(`writeLogsUser at: ${logFileFullPath}`)
}

const logFile = (): log4js.Logger => {
  return log4js.getLogger(pkgInfo.name)
}

const log = (): chalk.Chalk => {
  if (isNoColor) {
    return noColor
  }
  return chalk
}

export const logInfo = (message: string): void => {
  console.log(log().green(message))
  if (!isNoLogFile) {
    logFile().info(message)
  }
}

export const logDebug = (message: string): void => {
  if (isVerbose) {
    console.log(log().blue(message))
    if (!isNoLogFile) {
      logFile().debug(message)
    }
  }
}

export const logWarning = (message: string): void => {
  console.log(log().keyword('orange')(message))
  if (!isNoLogFile) {
    logFile().warn(message)
  }
}

export const logError = (message: string): void => {
  console.log(log().bold.red(message))
  if (!isNoLogFile) {
    logFile().error(message)
  }
}

export const openVerbose = (): void => {
  isVerbose = true
}

export const verbose = (): boolean => {
  return isVerbose
}

export const noNoColor = (): void => {
  isNoColor = true
}

export const noLogFile = (): void => {
  isNoLogFile = false
}

export const cleanUserHomeLogs = (): void => {
  const userFolder = userLoggerFolder()
  if (fsExtra.existsSync(userFolder)) {
    fsExtra.removeSync(userFolder)
    logInfo(`clean USER_HOME logs at: ${userFolder}`)
  }
}

// interface INLog extends Object {
//   openVerbose(): void
//
//   verbose(): boolean
//
//   noNoColor(): void
//
//   noLogFile(): void
//
//   // eslint-disable-next-line no-unused-vars
//   writeLogsUser(level?: string): void
//
//   // eslint-disable-next-line no-unused-vars
//   info(message?: string): void
//
//   // eslint-disable-next-line no-unused-vars
//   debug(message?: string): void
//
//   // eslint-disable-next-line no-unused-vars
//   warning(message?: string): void
//
//   // eslint-disable-next-line no-unused-vars
//   error(message?: string): void
// }
//
// class NLogEntry implements INLog {
//   private static nLogEntry: NLogEntry
//
//   private noColor = new chalk.Instance({ level: 0 })
//
//   private isNoColor = false
//
//   private isNoLogFile = true
//
//   private isVerbose = false
//
//   private constructor() {
//     // do nothing.
//   }
//
//   public static getInstance(): NLogEntry {
//     if (!NLogEntry.nLogEntry) {
//       NLogEntry.nLogEntry = new NLogEntry();
//     }
//     return NLogEntry.nLogEntry;
//   }
//
//   private logFile = (): log4js.Logger => {
//     return log4js.getLogger(pkgInfo.name);
//   }
//
//   private log = (): chalk.Chalk => {
//     if (this.isNoColor) {
//       return this.noColor;
//     }
//     return chalk;
//   }
//
//   debug(message: string): void {
//     if (this.isVerbose) {
//       console.log(this.log().blue(message));
//       if (!this.isNoLogFile) {
//         this.logFile().debug(message);
//       }
//     }
//   }
//
//   error(message: string): void {
//     console.log(this.log().bold.red(message));
//     if (!this.isNoLogFile) {
//       this.logFile().error(message);
//     }
//   }
//
//   info(message?: string): void {
//     console.log(this.log().green(message));
//     if (!this.isNoLogFile) {
//       this.logFile().info(message);
//     }
//   }
//
//   noLogFile(): void {
//     this.isNoLogFile = false;
//   }
//
//   noNoColor(): void {
//     this.isNoColor = true;
//   }
//
//   openVerbose(): void {
//     this.isVerbose = true;
//   }
//
//   verbose(): boolean {
//     return this.isVerbose;
//   }
//
//   warning(message?: string): void {
//     console.log(this.log().keyword('orange')(message));
//     if (!this.isNoLogFile) {
//       this.logFile().warn(message);
//     }
//   }
//
//   private userConfigFolder = (): string => {
//     let userHome = process.env.HOME || process.env.USERPROFILE;
//     if (!userHome) {
//       userHome = '~';
//     }
//     return path.join(userHome, `.${pkgInfo.name}`);
//   }
//
//   private userLoggerFolder = (): string => {
//     return path.join(this.userConfigFolder(), 'logs');
//   }
//
//   writeLogsUser(level?: string): void {
//     let logLevel = 'debug';
//     if (level) {
//       logLevel = level;
//     }
//     const logFileFullPath = path.join(
//       this.userLoggerFolder(),
//       `${pkgInfo.name}-${moment(new Date(), moment.defaultFormat).format('YYYY-MM-DD-HH-mm')}.log`
//     );
//     log4js.configure({
//       appenders: {
//         'node-cli-ts-temple': {
//           type: 'file',
//           filename: logFileFullPath
//         }
//       },
//       categories: {
//         default: {
//           appenders: ['node-cli-ts-temple'],
//           level: logLevel
//         }
//       }
//     });
//     console.log(`writeLogsUser at: ${logFileFullPath}`);
//   }
// }
//
// export const nLog = (): NLogEntry => {
//   return NLogEntry.getInstance();
// };
