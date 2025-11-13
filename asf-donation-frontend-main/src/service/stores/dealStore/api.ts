import { http } from 'src/http';
import {
  DealChartsQueryModel,
  DealStatisticsQueryModel,
  IDealUpdate,
  INewDealDraft,
  QueryDealForDashboard,
  QueryDealForMarketplace,
  TargetDeal,
  UploadDealFileModel,
} from 'src/service/model';
import { FileUploadApiRespone } from 'src/service/model/appStoreModel';
import { DealEntity } from 'src/types/deal';
import { ICommentWithReplies } from '../commentStore/model';
import {
  DealStatistics,
  DealStats,
  GetFromConnectionParams,
  QueryDealByIdApiRequest,
  QueryUserDealListActParams,
  QueryUserListActParams,
  ShareAttamptParams,
  UserDealEntity,
} from './model';

function commentFindByDealIDApi(payload: { deal_id: number; page: number; page_size: number }) {
  return http.request<{ content: ICommentWithReplies[]; count: number }>({
    url: '/api/comment/query/deal',
    method: 'POST',
    data: { ...payload },
  });
}

// 市场列表
function dealMarketplaceListApi(params: Partial<QueryUserListActParams>) {
  return http.request<{ content: DealEntity[]; count: number }>({
    url: '/api/deal/query/marketplace',
    method: 'POST',
    data: { ...params },
  });
}
// 查询用户的deal列表
function dealUserDealListApi(params: Partial<QueryUserDealListActParams>) {
  return http.request<{ content: DealEntity[]; count: number }>({
    url: '/api/deal/query/profile',
    method: 'POST',
    data: { ...params },
  });
}

function dealLandingPageListApi(params: QueryDealForMarketplace) {
  return http.request<{ content: DealEntity[]; counter: number }>({
    url: '/api/deal/query/public',
    method: 'POST',
    data: {
      ...params,
      page: 1,
      page_size: 5,
    },
  });
}

function createDraftApi(data: INewDealDraft) {
  return http.request<{ content: DealEntity[] }>({
    url: '/api/deal/draft',
    method: 'POST',
    data,
  });
}

function updateDraftApi(data: IDealUpdate) {
  return http.request<Partial<DealEntity>>({
    url: '/api/deal/update',
    method: 'POST',
    data,
  });
}

function submitDraftApi(data: { id: number }) {
  return http.request<Partial<DealEntity>>({
    url: '/api/deal/submit',
    method: 'POST',
    data: {
      id: data.id,
    },
  });
}

function publishDraftApi(data: TargetDeal) {
  return http.request<string>({
    url: '/api/deal/publish',
    method: 'POST',
    data,
  });
}

function renewDealApi(data: TargetDeal) {
  return http.request<Partial<DealEntity>>({
    url: '/api/deal/re-newal',
    method: 'POST',
    data,
  });
}

function reviseDealApi(data: TargetDeal) {
  return http.request<Partial<{ content: string }>>({
    url: '/api/deal/revise',
    method: 'POST',
    data,
  });
}

function queryDealByIdApi(data: QueryDealByIdApiRequest) {
  return http.request<{ content: DealEntity[] }>({
    url: '/api/deal/query/id',
    method: 'POST',
    data,
  });
}

function queryDealForDashboardApi(data: QueryDealForDashboard) {
  return http.request<{ content: DealEntity[]; count: number }>({
    url: '/api/deal/query/dashboard',
    method: 'POST',
    data,
  });
}

function archiveDealApi(data: TargetDeal) {
  return http.request<string>({
    url: '/api/deal/archive',
    method: 'POST',
    data,
  });
}

// 文件上传
function getDealFileUploadApi(params: UploadDealFileModel) {
  return http.request<{ content: FileUploadApiRespone }>({
    url: '/api/deal/file/upload',
    method: 'POST',
    data: params,
  });
}

function getDealPDFUploadApi(params: UploadDealFileModel) {
  return http.request<{ content: FileUploadApiRespone }>({
    url: '/api/deal/file/upload/pdf',
    method: 'POST',
    data: params,
  });
}

function fileUploadApi(url: string, params: File) {
  return http.put(url, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

// 统计数据获取
function getDealStatisticsApi(params: DealStatisticsQueryModel) {
  return http.request<{ content: DealStatistics[]; count: number }>({
    url: '/api/statistics/query/deal',
    method: 'POST',
    data: params,
  });
}

function getDealStatisticsDetailApi(params: DealChartsQueryModel) {
  return http.request<{ content: DealStats; count: number }>({
    url: '/api/statistics/query/deal-stat',
    method: 'POST',
    data: params,
  });
}

const api = {
  // 查询deal详情
  fetchDealDetailApi(params: TargetDeal) {
    return http.request<{ content: DealEntity[]; count: number }>({
      url: '/api/deal/query/id',
      method: 'POST',
      data: {
        id: params.id,
      },
    });
  },
  // query shared deal detail
  fetchShareDealDetailApi(params: TargetDeal) {
    return http.request<{ content: DealEntity[]; count: number }>({
      url: '/api/deal/query/share',
      method: 'POST',
      data: {
        id: params.id,
      },
    });
  },

  fetchDealWishlistApi(params: { ids: number[]; page_size: number; page: number }) {
    return http.request<{ content: DealEntity[]; count: number }>({
      url: '/api/deal/query/wishlist',
      method: 'POST',
      data: {
        ids: params.ids,
        page_size: params.page_size,
        page: params.page,
      },
    });
  },

  likeDealApi(params: TargetDeal) {
    return http.request<{ content: string }>({
      url: '/api/deal/wish',
      method: 'POST',
      data: {
        id: params.id,
      },
    });
  },
  getFromConnection(data: GetFromConnectionParams) {
    return http.request<{ content: UserDealEntity }>({
      url: '/api/user-profile/get-from-connection',
      method: 'POST',
      data,
    });
  },
  dealMarketplaceListApi,
  dealLandingPageListApi,
  createDraftApi,
  updateDraftApi,
  submitDraftApi,
  publishDraftApi,
  renewDealApi,
  archiveDealApi,
  queryDealByIdApi,
  queryDealForDashboardApi,
  getDealFileUploadApi,
  getDealPDFUploadApi,
  fileUploadApi,
  getDealStatisticsApi,
  getDealStatisticsDetailApi,
  commentFindByDealIDApi,
  dealUserDealListApi,
  reviseDealApi,
  queryUserInteractionApi(params: ShareAttamptParams) {
    return http.request({
      url: '/api/statistics/query/user-interaction/ctr',
      method: 'POST',
      data: params,
    });
  },
  shareAttamptApi(params: ShareAttamptParams) {
    return http.request({
      url: '/api/deal/share-attampt',
      method: 'POST',
      data: params,
    });
  },
};

export default api;
