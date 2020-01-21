import { exec } from 'child_process';

export const wrapThrowable = (funcThatThrows: any, args: Array<any>) => {
  /* */
  return function() {
    funcThatThrows.apply(null, args);
  };
};

export const getSTDOUTFromChildProcess = async (resolvedFilePath: string) => {
  return new Promise<string>((res, rej) => {
    const childProcess = exec(`node --require ts-node/register ${resolvedFilePath}`, (error, stdout) => {
      if (error) {
        console.error(error.stack);
      }

      res(stdout);
    });

    childProcess.on('exit', exitCode => {
      if (exitCode !== 0) {
        rej(exitCode);
      }
    });
  });
};
