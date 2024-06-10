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

export const getBio = async () => {
  const { data } = await axios.get(config.bioUrl);

  return data;
};

export const getExp = async () => {
  const { data } = await axios.get(config.experience);

  return data;
};

export const getResume = async () => {
  const { data } = await axios.get(config.resume);

  return data;
};

export const getPortfolio = async () => {
  const { data } = await axios.get(config.portfolio);

  return data;
};

export const getProjects = async () => {
  const { data } = await axios.get(config.projects);

  return data;
};
