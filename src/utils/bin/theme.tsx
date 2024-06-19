import Themes from '../../../themes.json';

const ERROR = `Usage: theme [arg]
Args:
  - ls: list all themes
  - set: set a theme
  - random: set a random theme

Example: 
  theme ls # to list all themes
  theme set Omni # to set a theme`;

export const theme = async (
  args: string[],
  callback?: (value: string) => string,
) => {
  if (args.length === 0) {
    return ERROR;
  }

  switch (args[0]) {
    case 'ls': {
      const themes = Themes.map((theme) => (
        <span
          className='h-fit cursor-pointer underline'
          onClick={() => callback?.(theme.name.toLowerCase())}
        >
          {theme.name}
        </span>
      ));

      return (
        <div className='flex w-full flex-wrap justify-between gap-2'>
          {themes}
        </div>
      );
    }
    case 'set': {
      const selectedTheme = args[1];

      return callback?.(selectedTheme.toLowerCase());
    }
    case 'random': {
      const randomTheme = Themes[Math.floor(Math.random() * Themes.length)];

      return callback?.(randomTheme.name.toLowerCase());
    }

    default: {
      return ERROR;
    }
  }
};

const themes = Themes.map((theme) => theme.name);

theme.description = 'Set the shell theme';
theme._arguments = {
  ls: null,
  set: themes,
  random: null,
};
