import { isCommandHidden } from '../completion';
import * as bin from './index';

interface CommandCallback extends Function {
  description?: string;
  hidden?: boolean;
}

const groupCommandsByDescription = () => {
  const grouped: {
    [description: string]: {
      aliases: [string, ...string[]];
      callback: CommandCallback;
    };
  } = {};

  Object.entries(bin)
    .sort()
    .forEach(([command, callback]) => {
      const description = callback.description || callback.name;

      if (isCommandHidden(callback)) {
        return;
      }

      if (!grouped[description]) {
        grouped[description] = { aliases: [command], callback };
        return;
      }

      grouped[description].aliases.push(command);
    });

  return grouped;
};

const formatCommandDescription = (
  command: string,
  aliases: string[],
  callback: CommandCallback,
): string => {
  const aliasList = aliases.map((alias) => `'${alias}'`).join(' / ');
  const args = callback.length > 0 ? '[args]' : '';
  const description = callback.description || 'No description available';
  return `<tr>
      <td>${command}</td>
      <td>${aliasList}</td>
      <td class="max-sm:hidden">${args}</td>
      <td class="text-right">${description}</td>
    </tr>`;
};

export const help = async (): Promise<string> => {
  const groupedCommands = groupCommandsByDescription();
  const commandDescriptions = Object.entries(groupedCommands).map(
    ([_, { aliases, callback }]) => {
      const command = aliases.pop() as string;
      return formatCommandDescription(command, aliases, callback);
    },
  );

  const output = `<table class="w-full">
    <thead class="text-left px-2">
      <tr>
        <th>Command</th>
        <th>Aliases</th>
        <th class="max-sm:hidden">Args</th>
        <th class="text-right">Description</th>
      </tr>
    </thead>
    <tbody>
      ${commandDescriptions.join('')}
    </tbody>
  </table>
  <p class="hidden sm:block">
[tab] trigger completion.<br/>
[ctrl+l] clear terminal.<br/>
  </p>
  <p class="block sm:hidden">
[touch] trigger completion.<br/>
  </p>`;

  return output;
};
export const h = help;

help.description = 'Show all available commands';

export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

echo.description = 'Print a message';

export const date = async (): Promise<string> => {
  return new Date().toString();
};

date.description = 'Show date and time';

// export const gui = async (args: string[]): Promise<string> => {
//   // window.open('https://m4tt72.com', '_self'); // TODO: Add personal url
//   window.open('https://vidg.webflow.io/', '_self'); // TODO: Add personal url

//   return 'Opening GUI version...';
// };

export const email = async (): Promise<string> => {
  window.open('mailto:keeganpotgieter@outlook.com.au');

  return 'Opening mailto:keeganpotgieter@outlook.com.au...';
};

email.description = 'Email me';

export const sudo = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  }, 1000);

  return `Permission denied: unable to run the command '${args?.[0]}' as root.`;
};

sudo.description = 'Sudo';

export const banner = (): string => {
  return `<h2 class="text-xl p-0">Welcome!</h2>

Example Commands:
  - Resume: 'resume' or 'r'
  - Github: 'github'

Contacts:
  - Email me: 'email'
  - LinkedIn: 'linkedin'

<p>Type 'help' to see a list of available commands.</p>

<div class='block sm:hidden border border-border/50 bg-border/10 rounded-md px-[2px] py-[1.5px] h-fit w-fit whitespace-normal bg-[conic-gradient(hsl(var(--secondary))_60deg,#22c55e_140deg,hsl(var(--primary))_200deg,hsl(var(--secondary))_340deg)]'>
For more fun, visit on a bigger device!
</div>
`;
};

banner.description = 'Display the welcome banner';

export const b = banner;

export const clear = () => {};
clear.description = 'Clear the terminal';
