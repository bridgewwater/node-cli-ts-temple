import { ICmdParams } from '../../src/utils/ICmdParams';
import { run } from '../../src/utils/cmdRunner';


test('cmdRunner run', () => {
  let runParams: ICmdParams = {
    cmd: 'git',
    args: ['status']
  };
  run({
    ...runParams,
    isStdio: true
  });
});