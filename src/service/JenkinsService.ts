import axios from 'axios';
import Config from '@app/config/config';
import { objectToQueryString } from '@app/util/String';
import { JenkinsError } from '@app/error/JenkinsError';

export const executeJob = async (jobName: string, params: any): Promise<void> => {
  try {
    const apiUrl = composeApiUrl(jobName, params);
    console.log(apiUrl);
    const response = await axios({
      url: apiUrl,
      method: 'post',
      params,
      auth: {
        username: Config.jenkins.username,
        password: Config.jenkins.password,
      }
    });
    console.log(response);
  } catch (e) {
    throw new JenkinsError(e);
  }
};

const composeApiUrl = (jobName: string, params: [any]): string => {
  const baseUrl: string = `${Config.jenkins.domain}/job/${jobName}/`;
  let queryString: string = '';
  let typeBuild: string = 'build';
  if (params.length > 0) {
    typeBuild = 'buildWithParameters';
    queryString = `&${objectToQueryString(params)}`;
  }
  return `${baseUrl}${typeBuild}?token=${Config.jenkins.token}${queryString}`;
};

// /job/Test%202%20Params/build?token=TOKEN_NAME or /buildWithParameters?token=TOKEN_NAME
