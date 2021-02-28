import { logError, logInfo, logWarning, PrintLogFilePath } from './nlog/nLog'
import { binName } from './utils/pkgInfo'

export const ExitZeroByHelp = (): void => {
  logInfo(`more info see ${binName()} --help .`)
  PrintLogFilePath()
  process.exit(0)
}

export const ProjectInitComplete = (): void => {
  logInfo('\n✅ Project init complete.')
  PrintLogFilePath()
  process.exit(0)
}

export const WarnToSafeExit = (message: string): void => {
  logWarning(message)
  PrintLogFilePath()
  process.exit(0)
}

export const ErrorAndExit = (exitCode = -128, message: string): void => {
  logError(message)
  PrintLogFilePath()
  process.exit(exitCode)
}
