import { JenkinsCommandInterface } from '@app/interface/JenkinsInterface';

/**
 * Extract job slug and parameters for Jenkins
 *
 * @param str
 */
export const extractJenkinsCommand = (str: string): JenkinsCommandInterface => {
  const [jobSlug, ...parameters] = str.split(' ');
  const params = [];
  for (const val of parameters) {
    const param = val.split('=');
    params.push(param);
  }

  return {
    job: jobSlug,
    params,
  };
};
