import { getExp } from '../../api';

export const experience = async (): Promise<string> => {
  const exp = await getExp();

  return exp;
};
export const e = experience;

experience.description = 'Get a summary of my work experience';
