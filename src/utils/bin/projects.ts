import { getProjects } from '../../api';

export const projects = async (): Promise<string> => {
  const bio = await getProjects();

  return bio;
};
export const p = projects;

projects.description = 'Get a summary of my projects';
