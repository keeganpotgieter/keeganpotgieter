import * as bin from './bin';

const commandCache: { [key: string]: boolean } = {};

export const commandExists = (command: string) => {
  if (commandCache[command]) {
    return commandCache[command];
  }

  const commands = Object.keys(bin);

  const result = commands.indexOf(command.split(' ')[0]) !== -1;
  commandCache[command] = result;

  return result;
};