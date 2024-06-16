import config from '../../config.json';
import axios from 'axios';

type Repo = {
  name: string;
  fork: boolean;
  html_url: string;
};

export const getRepos = async (): Promise<Repo[]> => {
  const { data } = await axios.get(
    `https://api.github.com/users/${config.social.github}/repos`,
  );

  return data;
};
