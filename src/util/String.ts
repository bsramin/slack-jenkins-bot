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

export const objectToQueryString = (obj: any): string => {
  let str = [];
  for (const p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(obj[p][0]) + "=" + encodeURIComponent(obj[p][1]));
    }
  return str.join("&");
}
