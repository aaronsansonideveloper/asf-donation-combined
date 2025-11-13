import { IBaseModel } from 'src/service/model/base';
import { RoleName } from '../authStore/model';

export interface IComment extends IBaseModel {
  content: string;
  likes: number;
  parent_id: number | null;
  user_id: number;
  deal_id: number;
  avatar: string;
  current_user_liked: boolean;
  user_name: string;
  deal_name: string;
  user_level: RoleName;
}

export interface ICommentWithReplies {
  comment: IComment;
  replies: IComment[];
}

export interface CreateCommentDTO {
  content: string;
  deal_id: number;
}

export interface CreateReplyDTO {
  content: string;
  parent_id: number | null;
  deal_id: number;
}

export interface TargetCommentDTO {
  id: number;
}

export interface UpdateCommentDTO {
  comment_id: number;
  content: string;
}

export interface ICommentQueryParams {
  id?: number;
  user_id?: number;
  deal_id?: number;
  parent_id?: number;
  order: Object;
}
