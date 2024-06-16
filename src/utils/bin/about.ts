import { html } from '@/lib/utils';

const content = html`# Hello there!`;

export const about = async (): Promise<string> => {
  return content;
};
export const a = about;

about.description = 'About me';
