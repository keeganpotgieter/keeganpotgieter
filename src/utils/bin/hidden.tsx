import { projects } from './projects';
import { github, linkedin, resume } from './social';
import EasterEgg from '@/components/easter-egg';
import { History } from '@/interfaces/history';

export const ls = (args?: string[]) => {
  const hasHiddenFlag = args && args.includes('-a');

  return (
    <div className='flex flex-col gap-4 whitespace-normal'>
      <span className='gradient-text text-xs'>
        a hidden command... nerd points +1
      </span>
      <div className='flex flex-row gap-6'>
        <div>linkedin</div>
        <div>keeganpotgieter</div>
        <div>projects</div>
        <div>resume</div>
        {hasHiddenFlag && <div>.youre_a_nerd_i_see</div>}
      </div>
    </div>
  );
};

ls.description = '';
ls.hidden = true;

const HiddenFileComponent = () => {
  return (
    <div>
      Well done... try looking a little deeper...
      <EasterEgg />
    </div>
  );
};

const DefaultCDComponent: React.FC<{ arg: string }> = ({ arg }) => {
  return <div>cd: no such file or directory: {arg}</div>;
};

export const cd = (args: string[]) => {
  if (args.length === 0) {
    return '';
  }

  if (args.length > 1) {
    return 'cd: too many arguments';
  }

  switch (args[0]) {
    case 'linkedin':
      return linkedin();

    case 'keeganpotgieter':
      return github();

    case 'projects':
      return projects();

    case 'resume':
      return resume();

    case '.youre_a_nerd_i_see':
      return <HiddenFileComponent />;

    default:
      return <DefaultCDComponent arg={args[0]} />;
  }
};

cd.description = '';
cd.hidden = true;

export const im_a_nerd = (history: History[]) => {
  // TODO
  console.log(history);
  if (history.find((h) => h.command === 'cd .youre_a_nerd_i_see')) {
    return 'youre_a_nerd_i_see';
  }
  return 'hahahahah';
};

im_a_nerd.description = '';
im_a_nerd.hidden = true;
