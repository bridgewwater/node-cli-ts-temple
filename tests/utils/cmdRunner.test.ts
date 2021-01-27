import { ICmdParams } from '../../src/utils/ICmdParams'
import { runCmd } from '../../src/utils/cmdRunner'

test('cmdRunner run', () => {
  let runParams: ICmdParams = {
    cmd: 'git',
    args: ['status']
  }
  runCmd({
    ...runParams,
    isStdio: true
  })
})
