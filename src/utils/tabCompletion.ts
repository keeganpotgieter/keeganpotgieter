import * as bin from './bin';
import { findIndexStartsWithAlphabetical } from './bin/find-index';

type BinType = typeof bin;
type BinFunctionWithArguments = {
  _arguments?: any;
  description: string;
  (): Promise<string>;
};

const hasArguments = (fn: any): fn is BinFunctionWithArguments => {
  return '_arguments' in fn;
};

const commandCache: { [key: string]: string[] } = {};

export const getCommandSuggestion = async (
  command: string,
  previousIndex: number = 0,
  setPreviousIndex: (value: number) => void,
): Promise<string | undefined> => {
  const completion = await handleAutocomplete(
    command,
    previousIndex,
    setPreviousIndex,
  );

  if (completion) {
    return completion.substring(command.length);
  }
};

export const getCommandCompletion = (command: string): string | undefined => {
  if (commandCache[command]) {
    const commands = commandCache[command];
    return commands[0];
  }

  const commands = Object.keys(bin).filter((entry) =>
    entry.startsWith(command),
  );

  commandCache[command] = commands;

  return commands[0];
};

export const handleTabCompletion = async (
  command: string,
  setCommand: (value: string | undefined) => void,
  previousIndex: number = 0,
  setPreviousIndex: (value: number) => void,
) => {
  const nextSuggestion = await handleAutocomplete(
    command,
    previousIndex,
    setPreviousIndex,
  );
  if (nextSuggestion) {
    setCommand(nextSuggestion);
  }
};

//
// Split the command and arguments and validate them
export const handleAutocomplete = async (
  input: string,
  previousIndex: number = 0,
  setPreviousIndex: (value: number) => void,
): Promise<string | undefined> => {
  const parts = input.trim().split(/\s+/);
  const [cmd, ...args] = parts;

  if (!cmd) {
    return undefined;
  }

  const binFunction = bin[cmd as keyof BinType];

  // If there are no more arguments expected
  if (!args.length && !binFunction) {
    return getCommandCompletion(cmd);
  }

  if (!binFunction) {
    return undefined;
  }

  const cmdArguments = hasArguments(binFunction) ? binFunction._arguments : {};

  const index = args.length - 1;

  let lastArg = null;
  let ctx = null;

  const _args = [...args];
  let usedArgs = _args.shift();
  while (usedArgs) {
    if (cmdArguments[usedArgs] !== undefined) {
      lastArg = usedArgs;
      ctx = cmdArguments[usedArgs];
    }
    usedArgs = _args.shift();
  }

  if (!lastArg) {
    // if lastCmd is null: below
    // Suggest the next argument
    const nextArg = Object.keys(cmdArguments).find((arg) => {
      return arg.startsWith(args[index] || '');
    });

    return nextArg
      ? cmd + ' ' + args.join(' ') + nextArg.substring(args[index]?.length ?? 0)
      : cmd + ' ' + args.join(' ');
  }

  // If the function expects no more arguments
  if (ctx === null) {
    return cmd + ' ' + args.join(' ');
  }

  let _arr = [];

  if (Array.isArray(ctx)) {
    _arr = ctx.slice(previousIndex);
  }

  if (typeof ctx === 'function') {
    _arr = ctx().slice(previousIndex);
  }

  const nextArgIndex = findIndexStartsWithAlphabetical(_arr, args[index] || '');

  const nextArg = _arr[nextArgIndex];

  if (nextArgIndex !== -1) setPreviousIndex(nextArgIndex + previousIndex);

  return nextArg
    ? cmd + ' ' + args.join(' ') + nextArg.substring(args[index]?.length ?? 0)
    : cmd + ' ' + args.join(' ');
};
//
