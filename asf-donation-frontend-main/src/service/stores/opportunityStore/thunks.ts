/* Instruments */
import { dp } from 'src/service';
import { QueryOpportunityRequest } from 'src/service/model/model';
import {
    OpportunityFindByIdsRequest,
    OpportunityWishApiRequest,
} from 'src/service/model/opportunityApi';
import { createThunks } from 'src/service/setup';

import httpApi from './api';

const thunks = createThunks('opportunityStore', {
  opportunityFindMarketplaceAct: async (arg: QueryOpportunityRequest = {}) => {
    const {
      data: { content, count },
    } = await httpApi.opportunityFindMarketplaceApi(arg);
    dp('opportunityStore', 'setOpportunityList', content);
    dp('opportunityStore', 'setCount', count);
  },
  opportunityWishAct: async (arg: OpportunityWishApiRequest) => {
    await httpApi.opportunityWishApi(arg);
  },
  opportunityFindByIdsAct: async (arg: OpportunityFindByIdsRequest) => {
    const {
      data: { content, count },
    } = await httpApi.opportunityFindByIds(arg);
    dp('opportunityStore', 'setOpportunityList', content);
  },
});

export default thunks;
