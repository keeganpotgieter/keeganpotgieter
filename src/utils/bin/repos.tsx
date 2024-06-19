import { getRepos } from '../../api';

export const repos = async () => {
  const projects = await getRepos();

  const filteredProjects = projects.filter((repo) => !repo.fork);

  if (filteredProjects.length === 0) {
    return 'No public projects found.';
  }

  return (
    <div className='flex flex-col gap-2'>
      {filteredProjects.map((repo) => (
        <div>
          {repo.name} -{' '}
          <a
            className='text-light-blue dark:text-dark-blue underline'
            href={repo.html_url}
            target='_blank'
          >
            {repo.html_url}
          </a>
        </div>
      ))}
    </div>
  );
};

repos.description = 'Get a list of my GitHub public repositories';
