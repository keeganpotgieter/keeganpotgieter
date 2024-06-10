import Themes from '../../../themes.json';

const ERROR = `Usage: theme [arg]
Args:
  - ls: list all themes
  - set: set a theme
  - random: set a random theme

Example: 
  theme ls # to list all themes
  theme set Gruvbox # to set a theme`;

const copyToClipboard = (text: string) => {
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const theme = async (
  args: string[],
  callback?: (value: string) => string,
): Promise<string | undefined> => {
  if (args.length === 0) {
    return ERROR;
  }

  switch (args[0]) {
    case 'ls': {
      // prettier-ignore
      const themes = Themes.map(
        (theme) => `<span 
          style="fit-content; height: fit-content;"
          onclick="copyToClipboard('${theme.name}')"><span style="cursor: pointer; text-decoration: underline;">${theme.name}</span>, </span>`,
      );

      return `<div style="width: 100%; display: flex; flex-wrap: wrap;">${themes.join(' ')}</div>`;
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

// Attach copyToClipboard function to window to make it accessible in onclick
if (typeof window !== 'undefined') {
  (window as any).copyToClipboard = copyToClipboard;
}
