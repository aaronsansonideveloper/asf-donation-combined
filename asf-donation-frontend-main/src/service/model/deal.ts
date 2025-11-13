import {
  DealEntity,
  DealStatus,
  DealType,
  IAskInfo,
  IDealComponentList,
  IDealTeamMember,
  IDealMedia,
  IDealFaqComponent,
} from 'src/types/deal';
import { FileUploadApiRequest } from './appStoreModel';

export interface INewDealDraft {
  type: DealType; // step 1

  title: string; // step 2

  industry: string; // step 2

  overview: string; // step 3

  address: string; // step 4

  ask: IAskInfo; // step 5

  highlights: Array<string>; // step 6

  pics: Array<string>; // step 7
  logo: string; // step 7

  components: IDealComponentList; // step 9

  teams: Array<IDealTeamMember>; // step 10

  documents_social: IDealMedia; // step 11

  faq: Array<IDealFaqComponent>; // step 12
}

// provide id or title, one or the other
export interface IDealUpdate extends Partial<DealEntity> {
  id?: number;
  title?: string;
  official_deal_id?: number;
  current_step?: number;
}

export interface TargetDeal {
  id?: number;
  title?: string;
}

export interface QueryDeal {
  title?: string;
  type?: DealType;
  ids?: number[];
  user_id?: number;
  status?: DealStatus;
  expire_at?: [Date, Date];
  is_submitted?: boolean;
  is_approved?: boolean;
  is_draft?: boolean;
  official_deal_id?: number;
  page: number;
  page_size: number;
}

export interface QueryDealForDashboard extends QueryDeal {
  order: {};
}

export interface QueryDealForMarketplace {
  type?: DealType | undefined;
  title?: string;
  category?: string;
  order?: {};
  page?: number;
  page_size?: number;
}

export interface UploadDealFileModel extends FileUploadApiRequest {
  component_type?: DealFileComponentType;
}

export enum DealFileComponentType {
  DEAL_PIC_MAIN = 'DEAL_PIC_MAIN',
  DEAL_LOGO = 'DEAL_LOGO',
  DEAL_VIDEO_MAIN = 'DEAL_VIDEO_MAIN',

  DEAL_PROBLEM_PIC = 'DEAL_PROBLEM_PIC',
  DEAL_SOLUTION_PIC = 'DEAL_SOLUTION_PIC',
  DEAL_PRODUCT_PIC = 'DEAL_PRODUCT_PIC',
  DEAL_TRACTION_PIC = 'DEAL_TRACTION_PIC',
  DEAL_MARKET_PIC = 'DEAL_MARKET_PIC',
  DEAL_BUSINESS_MODEL_PIC = 'DEAL_BUSINESS_MODEL_PIC',
  DEAL_COMPETITION_PIC = 'DEAL_COMPETITION_PIC',
  DEAL_VISION_PIC = 'DEAL_VISION_PIC',
  DEAL_IMPACT_PIC = 'DEAL_IMPACT_PIC',
  DEAL_FUNDING_PIC = 'DEAL_FUNDING_PIC',
  DEAL_FOUNDERS_PIC = 'DEAL_FOUNDERS_PIC',
  DEAL_SUMMERY_PIC = 'DEAL_SUMMERY_PIC',

  DEAL_ABOUT_PIC = 'DEAL_ABOUT_PIC',
  DEAL_TERMS_PIC = 'DEAL_TERMS_PIC',
  DEAL_TEAM_PIC = 'DEAL_TEAM_PIC',

  DEAL_UPDATE_PIC = 'DEAL_UPDATE_PIC',
  DEAL_ATTACHMENT_FILE = 'DEAL_ATTACHMENT_FILE',
}

export interface DealStatisticsQueryModel {
  deal_ids: number[];
  created_at?: [Date, Date];
}

export interface DealChartsQueryModel { 
    id: number;
    start_date?: Date;
    end_date?: Date;
}