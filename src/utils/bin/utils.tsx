import { isCommandHidden } from '../completion';
import * as bin from './index';
import BorderAnimate from '@/components/ui/extended/border-animate';

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
) => {
  const aliasList = aliases.map((alias) => `'${alias}'`).join(' / ');
  const args = callback.length > 0 ? '[args]' : '';
  const description = callback.description || 'No description available';
  return (
    <tr>
      <td>{command}</td>
      <td>{aliasList}</td>
      <td className='max-sm:hidden'>{args}</td>
      <td className='text-right'>{description}</td>
    </tr>
  );
};

export const help = async () => {
  const groupedCommands = groupCommandsByDescription();

  const commandDescriptions = Object.entries(groupedCommands).map(
    ([_, { aliases, callback }]) => {
      const command = aliases.pop() as string;
      return formatCommandDescription(command, aliases, callback);
    },
  );

  return (
    <div className='flex flex-col gap-4'>
      <table className='w-full'>
        <thead className='px-2 text-left'>
          <tr>
            <th>Command</th>
            <th>Aliases</th>
            <th className='max-sm:hidden'>Args</th>
            <th className='text-right'>Description</th>
          </tr>
        </thead>
        <tbody>{commandDescriptions}</tbody>
      </table>
      <p className='hidden sm:block'>
        [tab] trigger completion.
        <br />
        [ctrl+l] clear terminal.
        <br />
      </p>
      <p className='block sm:hidden'>
        [touch] trigger completion.
        <br />
      </p>
    </div>
  );
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

export const banner = () => {
  return (
    <BorderAnimate>
      <h2 className='p-0 text-xl'>Welcome! I'm Keegan 👋</h2>
      <span className='text-sm text-border/75'>
        I'm a software enginner currently focused on full-stack development.
      </span>
      <div className='mt-4 flex flex-col text-sm'>
        <h3 className='text-base'>Example Commands:</h3>
        <span>- Resume: 'resume' or 'r' </span>
        <span>- Github: 'github' </span>

        <h3 className='mt-2 text-base'>Contacts:</h3>
        <span>- Email me: 'email'</span>
        <span>- LinkedIn: 'linkedin'</span>
      </div>
      <br></br>
      <p className='text-xs'>
        Type 'help' to see a list of available commands.
      </p>
      <div className='mt-2 block h-fit w-fit whitespace-normal rounded-md border border-border/50 bg-border/10 bg-[conic-gradient(hsl(var(--secondary))_60deg,#22c55e_140deg,hsl(var(--primary))_200deg,hsl(var(--secondary))_340deg)] px-[2px] py-[1.5px] sm:hidden'>
        For more fun, visit on a bigger device!
      </div>
    </BorderAnimate>
    // <div className='flex flex-col gap-4'>
    //   <h2 className='p-0 text-xl'>Welcome!</h2>
    //   <div className='flex flex-col gap-2'>
    //     <h3>Example Commands:</h3>
    //     <span>- Resume: 'resume' or 'r' </span>
    //     <span> - Github: 'github' </span>

    //     <h3>Contacts:</h3>
    //     <span>- Email me: 'email'</span>
    //     <span>- LinkedIn: 'linkedin'</span>
    //   </div>
    //   <p>Type 'help' to see a list of available commands.</p>
    //   <div className='block h-fit w-fit whitespace-normal rounded-md border border-border/50 bg-border/10 bg-[conic-gradient(hsl(var(--secondary))_60deg,#22c55e_140deg,hsl(var(--primary))_200deg,hsl(var(--secondary))_340deg)] px-[2px] py-[1.5px] sm:hidden'>
    //     For more fun, visit on a bigger device!
    //   </div>
    // </div>
  );
};

banner.description = 'Display the welcome banner';

export const b = banner;

export const clear = () => {};
clear.description = 'Clear the terminal';
