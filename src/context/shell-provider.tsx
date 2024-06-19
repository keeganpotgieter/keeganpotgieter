import { History } from '../interfaces/history';
import * as bin from '../utils/bin';
import { useTheme } from './theme-provider';
import React, { useEffect } from 'react';

type BinType = typeof bin;

async function handleCommand(
  cmd: string,
  args: string[],
  handleSetHistory: (value: string) => void,
) {
  if (Object.keys(bin).indexOf(cmd) === -1) {
    handleSetHistory(`Command not found: ${cmd}. Try 'help' to get started.`);
  } else {
    try {
      const binFunction = bin[cmd as keyof BinType] as (
        args: string[],
      ) => Promise<string | undefined>;
      const output = await binFunction(args);

      handleSetHistory(output || ''); // Provide a default value if output is undefined
    } catch (error) {
      handleSetHistory((error as Error).message);
    }
  }
}

interface ShellContextType {
  history: History[];
  command: string;
  lastCommandIndex: number;

  setHistory: (output: string) => void;
  setCommand: (command: string) => void;
  setLastCommandIndex: (index: number) => void;
  execute: (command: string) => Promise<void>;
  clearHistory: () => void;
}

const ShellContext = React.createContext<ShellContextType | undefined>(
  undefined,
);

interface ShellProviderProps {
  children: React.ReactNode;
}

export const useShell = () => {
  const context = React.useContext(ShellContext);

  if (!context) {
    throw new Error('useShell must be used within a ShellProvider');
  }

  return context;
};

export const normaliseString = (str: string) => str.replace(/\u00A0/g, ' ');

export const ShellProvider: React.FC<ShellProviderProps> = ({ children }) => {
  const [init, setInit] = React.useState(true);
  const [history, setHistory] = React.useState<History[]>([]);
  const [command, setCommand] = React.useState<string>('');
  const [lastCommandIndex, setLastCommandIndex] = React.useState<number>(0);
  const { setTheme } = useTheme();

  useEffect(() => {
    handleSetCommand('banner');
  }, []);

  useEffect(() => {
    if (!init) {
      execute();
    }
  }, [command, init]);

  const handleSetHistory = (output: React.ReactNode) => {
    setHistory([
      ...history,
      {
        id: history.length,
        date: new Date(),
        command: command.split(' ').slice(1).join(' '),
        output,
      },
    ]);
  };

  const handleSetCommand = (command: string) => {
    setCommand([Date.now(), command].join(' '));

    setInit(false);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const handleSetLastCommandIndex = (index: number) => {
    setLastCommandIndex(index);
  };

  const execute = async () => {
    const normalisedCommand = normaliseString(command).trim();
    const [cmd, ...args] = normalisedCommand.split(' ').slice(1);

    switch (cmd) {
      case 'theme': {
        const result = await bin.theme(args, setTheme);
        handleSetHistory(result || '');

        break;
      }
      case 'clear':
        clearHistory();
        break;
      case '':
        handleSetHistory('');
        break;
      case 'im_a_nerd':
        const result = bin.im_a_nerd(history);
        handleSetHistory(result || '');
        break;
      default: {
        handleCommand(cmd, args, handleSetHistory);
      }
    }
  };

  const contextValue = React.useMemo(
    () => ({
      history,
      command,
      lastCommandIndex,
      setHistory: handleSetHistory,
      setCommand: handleSetCommand,
      setLastCommandIndex: handleSetLastCommandIndex,
      execute,
      clearHistory,
    }),
    [
      history,
      command,
      lastCommandIndex,
      handleSetHistory,
      handleSetCommand,
      handleSetLastCommandIndex,
      execute,
      clearHistory,
    ],
  );

  return (
    <ShellContext.Provider value={contextValue}>
      {children}
    </ShellContext.Provider>
  );
};
