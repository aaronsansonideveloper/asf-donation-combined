import { IOpportunity } from 'src/service/model';
import { DealEntity, DealType } from 'src/types/deal';
import { ICommentWithReplies } from '../commentStore/model';
import { RoleName } from '../authStore/model';

export interface PaginationData {
  pageNum: number;
  pageCount: number;
  pageSize: number;
}
export interface SliceState {
  targetType: DealType;
  loading: boolean;
  currentDeal: DealEntity | null;
  // 用于查询已经发布的deal列表 在notification的publish deal中使用 大部分时候其实都只返回一个deal. 由于单独使用， 所以要写一个单独的thunk.
  dealList: Array<DealEntity>;
  page: number;
  pageSize: number;
  count: number;

  // statistics, deal相关的统计数据
  statistics: Array<DealStatistics>;
  statistics_count: number;
  statistics_detail: DealStats | null;

  current_user_deals_list: DealEntity[];
  current_user_deals_list_counter: number;

  dealMarketList: DealEntity[];
  dealMarketListPageNum: number | undefined;

  // **deal详情页**
  // 当前详情的deal id
  currentDealId: number;
  // 当前详情
  dealDetail?: DealEntity | null;
  // 评论翻页数据
  dealComentPagination: PaginationData;
  comments: ICommentWithReplies[];
  wishList: IOpportunity[]; // for Opportunities
  likeList: DealEntity[]; // for Deals

  // step1数据
  dealData: {
    type?: string;
  } | null;
  stepIndex: number;
  isComplete: boolean;
  isFirstAdd: boolean;
  expandId: number;
  // 用户modal，显示相关联的deal卡片
  userDealList: DealEntity[];
  relatedUserDealList: DealEntity[];
  currentUserDeal: UserDealEntity | null;
  dealStat: DealStat | null;
}
export interface QueryDealByIdApiRequest {
  id: number;
  title?: string;
}

export interface GetFromConnectionParams {
  id: string;
}

export interface DealStatistics {
  // core fields
  id: number;
  deal_id: number;

  // timestamp fields
  created_at: Date;
  // statistics fields - daily
  views: number;
  likes: number;
  clicks: number;
  share_attempt: number;
  share_clicked: number;
  comments_made: number;
  connection_requests_sent: number;
  profile_views: number;
  user_created_from_share: number;
  // additional fields
  share_page_user_created: number[];
}

export interface DealStats {
  views: { date: number; views: number }[];
  clicks: { date: number; clicks: number }[];
  likes: { date: number; likes: number }[];
  share_clicked: { date: number; views: number }[];
  connection_requests_sent: { date: number; clicks: number }[];
  profile_views: { date: number; likes: number }[];
}

export interface ShareAttamptParams {
  id: number;
}

export interface QueryUserListActParams {
  id: string;
  page?: number;
  page_size?: number;
  title?: string;
}

export interface QueryUserDealListActParams {
  user_id?: number;
}

export interface UserDealEntity {
  bio: string;
  created_at: string;
  deleted_at: string;
  first_name: string;
  id: number;
  instagramBusiness: string;
  instagramPersonal: string;
  last_name: string;
  linkedinBusiness: string;
  linkedinPersonal: string;
  user_level: RoleName;
  user_infor: {
    first_name: string;
    last_name: string;
    metadata: {
      avatar: string;
    };
  };
  metadata: {
    avatar: string;
  };
  title: string;
  updated_at: string;
  userId: number;
  website1: string;
  website2: string;
}

export interface QueryDealStatusParams {
  id: number; // id 就是被展开的deal 的id

  start_date?: string; // 根据选择的时间段 传入开始时间

  end_date?: string; //
}

export interface DealStat {
  views: { date: number; views: number }[];
  clicks: { date: number; clicks: number }[];
  likes: { date: number; likes: number }[];
  share_clicked: { date: number; share_clicked: number }[];
  connection_requests_sent: { date: number; connection_requests_sent: number }[];
  profile_views: { date: number; connection_requests_sent: number };
}
