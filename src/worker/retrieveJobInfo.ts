import axios from 'axios';
import Config from '@app/config/config';
import { expose } from 'threads/worker';

export const WorkerJobInfo = {
  async retrieveJobInfoWorker(getterJobInfoUrl: string) {
    const item: any = await axios({
      url: `${getterJobInfoUrl}api/json`,
      method: 'get',
      auth: {
        username: Config.jenkins.username,
        password: Config.jenkins.password,
      },
    });
    return item.data;
  }
}

expose(WorkerJobInfo);
