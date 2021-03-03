import { checkNodeVersion } from './utils/envCheck'
import { initCommand } from './node-cli-ts-temple'
import { ErrorAndExit } from './globalBiz'
import { userConfigJsonPath } from './config/userConfig'
import { binName } from './utils/pkgInfo'

checkNodeVersion()
try {
  initCommand()
} catch (e) {
  console.log(e)
  ErrorAndExit(
    -127,
    `maybe config error, please remove config at: ${userConfigJsonPath()}
or use: npm install -g ${binName()} to fix`
  )
}
