/* Instruments */

import { dp } from 'src/service';
import { createThunks } from 'src/service/setup';
import httpApi from './api';

const thunks = createThunks('userStore', {
  userQueryByIDAct: async (params: number) => {
    const {
      data: { content },
    } = await httpApi.UserQueryByIDApi(params);
    dp('userStore', 'setUserTalkjs', { content });
  },
});

export default thunks;
