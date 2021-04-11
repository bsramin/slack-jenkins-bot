import { JenkinsCommandInterface } from '@app/interface/JenkinsInterface';
import { SlackParamsError } from '@app/error/SlackParamsError';
import { SlackRequest } from '@app/interface/slackInterface';

/**
 * Extract job slug and parameters for Jenkins
 *
 * @param slackRequest
 */
export const extractJenkinsCommand = (slackRequest: SlackRequest): JenkinsCommandInterface => {
  const args = slackRequest.text;
  try {
    if (args?.length === 0 && !/\s/.test(<string>args)) {
      throw new SlackParamsError();
    }
    const [jobSlug, ...parameters] = args.split(' ');
    const params = [];
    for (const val of parameters) {
      const param = val.split('=');
      if (param != undefined) {
        params.push(param);
      }
    }

    return {
      command: slackRequest.command,
      job: jobSlug,
      params: args,
    };
  } catch (e) {
    throw e;
  }
};

/**
 * @param obj
 */
export const objectToQueryString = (obj: any): string => {
  let str = [];
  for (const p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(obj[p][0]) + "=" + encodeURIComponent(obj[p][1]));
    }
  return str.join("&");
}
