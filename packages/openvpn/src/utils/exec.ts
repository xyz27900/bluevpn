import * as childProcess from 'child_process';
import * as util from 'util';

const execute = util.promisify(childProcess.exec);

export const exec = async (command: string, output: 'stdout' | 'stderr' = 'stdout'): Promise<string> => {
  const promise = execute(command);
  const { stdout, stderr } = await promise;
  if (output === 'stderr') {
    return stderr;
  } else if (stderr) {
    throw new Error(stderr);
  } else {
    return stdout;
  }
};
