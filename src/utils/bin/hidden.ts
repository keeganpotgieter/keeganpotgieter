import { projects } from './projects';
import { github, linkedin, resume } from './social';
import { html } from '@/lib/utils';

export const ls = (args?: string[]) => {
  const hasHiddenFlag = args && args.includes('-a');

  return html` <div class="flex flex-col gap-4 whitespace-normal">
    <span class="gradient-text text-xs"
      >a hidden command... nerd points +1</span
    >
    <div class="flex flex-row gap-6">
      <div>linkedin</div>
      <div>keeganpotgieter</div>
      <div>projects</div>
      <div>resume</div>
      ${hasHiddenFlag ? '<div>.youre_a_nerd_i_see</div>' : ''}
    </div>
  </div>`;
};

ls.description = 'List';
ls.hidden = true;

export const cd = (args: string[]) => {
  const hasHiddenFlag = args && args.includes('-a');

  if (args.length === 0) {
    return '';
  }

  if (args.length > 1) {
    return 'cd: too many arguments';
  }

  switch (args[0]) {
    case 'linkedin':
      // TODO: open linkedin
      return linkedin();

    case 'keeganpotgieter':
      // TODO: open keeganpotgieter
      return github();

    case 'projects':
      // TODO: open projects
      return projects();

    case 'resume':
      // TODO: open resume
      return resume();

    case '.youre_a_nerd_i_see':
      // TODO: open .youre_a_nerd_i_see
      break;

    default:
      return `cd: no such file or directory: ${args[0]}`;
  }

  return html`<div class="flex flex-row gap-6 whitespace-normal">
    <div>linkedin</div>
    <div>keeganpotgieter</div>
    <div>projects</div>
    <div>resume</div>
    ${hasHiddenFlag ? '<div>.youre_a_nerd_i_see</div>' : ''}
  </div>`;
};

cd.description = 'Change directory';
cd.hidden = true;
