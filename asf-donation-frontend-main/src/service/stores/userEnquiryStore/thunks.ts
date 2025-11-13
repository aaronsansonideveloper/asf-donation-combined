/* Instruments */
import { QueryUserEnquiryRequest } from 'src/service/model/model';

import { dp } from 'src/service';
import { createThunks } from 'src/service/setup';
import httpApi from './api';

const thunks = createThunks('user_enquiryStore', {
  enquiriesFindByUserAct: async (arg: Partial<QueryUserEnquiryRequest>) => {
    const {
      data: { content, count },
    } = await httpApi.enquiriesFindByUserApi(arg);
    dp('user_enquiryStore', 'setUserEnquiry', content);
    dp('user_enquiryStore', 'setCount', count);
  },
});

export default thunks;
