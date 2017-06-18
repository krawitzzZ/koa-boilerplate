import createDebug from 'debug';

export const clearConsole = () => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-useless-escape
    process.stdout.write(process.platform === 'win32' ? '\z1Bc' : '\x1B[2J\x1B[3J\x1B[H');
  }
};

export const newDebug = name => {
  const privateDebug = createDebug(name);
  const debug = (data = '', divider = false) => {
    if (divider) {
      privateDebug(`${data} (${new Date().toUTCString()})`);
      privateDebug('-----------------------------------------------------------------------------');
      return;
    }

    privateDebug(`${data} (${new Date().toUTCString()})`);
  };

  return debug;
};
