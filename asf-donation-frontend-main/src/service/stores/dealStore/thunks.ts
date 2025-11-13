/* Instruments */
import { merge } from 'lodash-es';
import { dp, dpChain } from 'src/service';
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
import { createThunks } from 'src/service/setup';
import httpApi from './api';
import { shareMock } from './mock';
import {
  GetFromConnectionParams,
  QueryDealByIdApiRequest,
  QueryUserDealListActParams,
  QueryUserListActParams,
  ShareAttamptParams,
} from './model';

const thunks = createThunks('dealStore', {
  likeDealAct: async (params: TargetDeal) => {
    const {
      data: { content },
      code,
    } = await httpApi.likeDealApi(params);
    return code === 1;
  },
  fetchDealWishlistAct: async (params: { ids: number[]; page_size: number; page: number }) => {
    const {
      data: { content, count },
    } = await httpApi.fetchDealWishlistApi(params);
    dp('dealStore', 'setLikeList', content);
  },
  queryDealDetailAct: async (params: TargetDeal, api) => {
    const {
      data: { content, count },
    } = await httpApi.fetchDealDetailApi(params);
    dp('dealStore', 'setDealDetail', content?.[0]);
  },
  queryShareDealDetailAct: async (params: TargetDeal, api) => {
    const {
      data: { content, count },
    } = await httpApi.fetchShareDealDetailApi(params);
    dp('dealStore', 'setDealDetail', merge(shareMock, content?.[0]));
  },
  queryCommentList: async (payload: { deal_id?: number } = {}, api) => {
    // 取comment的Pagination信息
    const {
      currentDealId,
      dealComentPagination: { pageNum, pageSize },
    } = api.getState().dealStore;
    if (!currentDealId) return;
    const {
      data: { content, count },
    } = await httpApi.commentFindByDealIDApi({
      deal_id: currentDealId,
      page: pageNum,
      page_size: pageSize,
      ...payload,
    });
    dp('dealStore', 'setComments', content);
    dp('dealStore', 'setDealComentPagination', { pageCount: count });
  },
  queryDealListAct: async (searchParams: QueryDealForMarketplace, api) => {
    let params = searchParams || {};
    const { marketDealType } = api.getState().marketStore;
    const { pageSize, page } = api.getState().dealStore;
    if (marketDealType) {
      params.type = marketDealType;
    }
    const {
      data: { content, count },
    } = await httpApi.dealMarketplaceListApi({ ...params, page_size: pageSize, page: page + 1 });
  },
  createDraftAct: async (arg: INewDealDraft, api) => {
    const { data } = await httpApi.createDraftApi(arg);
    data.content[0] && dp('dealStore', 'setCurrentDeal', data.content[0]);
    return data;
  },

  updateDraftAct: async (arg: IDealUpdate, api) => {
    const { data } = await httpApi.updateDraftApi(arg);
  },

  submitDraftAct: async (arg: { id: number }, api) => {
    const { data } = await httpApi.submitDraftApi(arg);
  },

  publishDraftAct: async (arg: TargetDeal, api) => {
    const { data } = await httpApi.publishDraftApi(arg);
  },

  //
  renewDealAct: async (arg: TargetDeal, api) => {
    const { data } = await httpApi.renewDealApi(arg);
  },
  reviseDealAct: async (arg: TargetDeal, api) => {
    const { data } = await httpApi.reviseDealApi(arg);
    return data;
  },

  // archive deal
  archiveDealAct: async (arg: TargetDeal) => {
    const { data } = await httpApi.archiveDealApi(arg);
  },

  //延长60天Deal life span
  queryDealByIdAct: async (arg: QueryDealByIdApiRequest, api) => {
    const { data } = await httpApi.queryDealByIdApi(arg);
    dp('dealStore', 'setCurrentDeal', data.content[0]);
  },

  queryDealForDashboardAct: async (arg: QueryDealForDashboard, api) => {
    const { data } = await httpApi.queryDealForDashboardApi(arg);
    dp('dealStore', 'setCurrentUserDealsList', data.content);
    dp('dealStore', 'setListTotalCount', data.count);
  },

  // 统计数据获取
  getDealStatisticsAct: async (arg: DealStatisticsQueryModel, api) => {
    const {
      data: { content, count },
    } = await httpApi.getDealStatisticsApi(arg);
    dp('dealStore', 'setStatistics', content);
    dp('dealStore', 'setStatisticsCount', count);
  },

  getDealStatisticsDetailAct: async (arg: DealChartsQueryModel, api) => {
    const {
      data: { content },
    } = await httpApi.getDealStatisticsDetailApi(arg);
    console.log(content)
    dp('dealStore', 'setStatisticsDetail', content);
  },

  // file uploads
  getUploadUrlAct: async (arg: UploadDealFileModel, api) => {
    const { file, ...rest } = arg;
    rest.id = Number(rest.id);
    const { data } = await httpApi.getDealFileUploadApi(rest);
    const { fileUrl, presignedUrl } = data.content;
    await httpApi.fileUploadApi(presignedUrl, file!);
    return { presignedUrl, fileUrl };
  },

  // PDF file uploads
  getPDFUploadUrlAct: async (arg: UploadDealFileModel, api) => {
    const { file, ...rest } = arg;
    rest.id = Number(rest.id);
    const { data } = await httpApi.getDealPDFUploadApi(rest);
    const { fileUrl, presignedUrl } = data.content;
    await httpApi.fileUploadApi(presignedUrl, file!);
    return { presignedUrl, fileUrl };
  },
  shareAttamptAct: async (arg: ShareAttamptParams, api) => {
    httpApi.shareAttamptApi(arg);
  },
  // 市场页面的列表查询
  queryUserListAct: async (searchParams: QueryUserDealListActParams = {}, api) => {
    const {
      data: { content },
    } = await httpApi.dealUserDealListApi({ ...searchParams });
    dp('dealStore', 'setUserDealList', content);
  },
  queryRelatedListAct: async (searchParams: Partial<QueryUserListActParams> = {}, api) => {
    const {
      data: { content },
    } = await httpApi.dealMarketplaceListApi({ ...searchParams });
    dp('dealStore', 'setRelatedDealList', content);
  },
  getFromConnectionAct: async (arg: GetFromConnectionParams, api) => {
    const { data } = await httpApi.getFromConnection(arg);
    await dpChain('dealStore').setCurrentUserDeal(data.content);
    return data.content;
  },
  queryUserInteractionAct: async (arg: any, api) => {
    const { data } = await httpApi.queryUserInteractionApi(arg);
  },
});

export default thunks;
