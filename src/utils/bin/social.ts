import config from '../../../config.json';

export const github = async (): Promise<string> => {
  window.open(`https://github.com/${config.social.github}/`);

  return 'Opening github...';
};

github.description = 'Open my github profile';

export const super_secret = async (): Promise<string> => {
  window.open(`https://www.youtube.com/watch?v=QB7ACr7pUuE`);

  return 'sorry...';
};

super_secret.description = 'Shhhh...';

export const resume = async (): Promise<string> => {
  window.open(`./assets/Resume_01_24.pdf`, '_blank');

  return 'Opening resume...';
};

resume.description = 'Open my resume';

export const r = resume;

export const linkedin = async (): Promise<string> => {
  window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);

  return 'Opening linkedin...';
};

linkedin.description = 'Open my linkedin profile';
