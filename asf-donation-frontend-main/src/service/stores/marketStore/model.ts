import { DealEntity, DealType } from 'src/types/deal';
export interface PageShape {
  count: number;
  page: number;
  page_size: number;
}
export interface SliceState {
  isLoading: boolean;
  // 旧设计留下的字段 暂时不知道是否deprecated 留着吧
  searchPostCode: number | undefined;
  postCode: number | undefined;
  title: string;
  // 第一阶段只需要Deal， 所以只需要Deal相关的字段, 实际上， 一开始
  searchData: string | undefined;
  marketDealType: DealType | undefined; // null 代表全部
  page: number;
  pageSize: number;
  dealMarketListCount: number;
  landingPageDealList: DealEntity[];
  landingPageDealListCounter: number;
  dealMarketList: DealEntity[];
  pageDataSearchView: PageShape;
  // defalt view data
  dealFreeList: DealEntity[];
  dealPremiumList: DealEntity[];
  dealProList: DealEntity[];
  pageDataDefaultView: PageShape;
  dealMarketListPageNum: number | undefined;
}

export interface QueryDealByIdApiRequest {
  id: number;
  title?: string;
}

export interface DealStatistics {
  deal_id: number;
  view: number;
  click: number;
  enquiry: number;
  liked: number;
}

export interface ConversionFacebookClickParams {
  source?: string | null;
  medium?: string | null;
  campaingn?: string | null;
  term?: string | null;
  advertisement?: string | null;
  link_id: string;
}

export interface DealMarketplaceDefaultListApiRes {
  content: {
    free_result: DealEntity[];
    premium_result: DealEntity[];
    pro_result: DealEntity[];
    page: number;
    page_size: number;
  };
  count: number;
}
export interface DealMarketplaceDefaultListApiReq {
  page?: number;
  page_size?: number;
}
