import { http } from 'src/http';
import { QueryOpportunityRequest } from '../../model/model';
import { IOpportunity } from 'src/service/model';
import {
  OpportunityFindByIdsRequest,
  OpportunityWishApiRequest,
} from 'src/service/model/opportunityApi';

function opportunityFindMarketplaceApi(params: QueryOpportunityRequest) {
  return http.request<{
    content: IOpportunity[];
    count: number;
  }>({
    url: '/api/opportunity/find/marketplace',
    method: 'POST',
    data: { ...params },
  });
}

function opportunityWishApi(params: OpportunityWishApiRequest) {
  return http.request<{ content: IOpportunity[] }>({
    url: '/api/opportunity/wish',
    method: 'POST',
    data: { ...params },
  });
}

function opportunityFindByIds(params: OpportunityFindByIdsRequest) {
  return http.request<{ content: IOpportunity[]; count: number }>({
    url: '/api/opportunity/find/ids',
    method: 'POST',
    data: { ...params },
  });
}

const api = {
  opportunityFindMarketplaceApi,
  opportunityWishApi,
  opportunityFindByIds,
};

export default api;
