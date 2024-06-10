import { getRepos } from '../../api';

export const repos = async (): Promise<string> => {
  const projects = await getRepos();

  const filteredProjects = projects.filter((repo) => !repo.fork);

  if (filteredProjects.length === 0) {
    return 'No public projects found.';
  }

  return filteredProjects
    .map(
      (repo) =>
        `${repo.name} - <a class="text-light-blue dark:text-dark-blue underline" href="${repo.html_url}" target="_blank">${repo.html_url}</a>`,
    )
    .join('\n');
};

repos.description = 'Get a list of my GitHub public repositories';
