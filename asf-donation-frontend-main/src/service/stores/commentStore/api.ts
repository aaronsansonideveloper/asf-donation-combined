import { http } from 'src/http';
import {
  CreateCommentDTO,
  CreateReplyDTO,
  IComment,
  ICommentWithReplies,
  TargetCommentDTO,
  UpdateCommentDTO,
} from './model';

function commentCreationAPi(payload: CreateCommentDTO) {
  return http.request<{ content: IComment }>({
    url: '/api/comment/deal/create',
    method: 'POST',
    data: {
      ...payload,
    },
  });
}

function replyCreationAPi(payload: CreateReplyDTO) {
  return http.request<{ content: IComment }>({
    url: '/api/comment/deal/create',
    method: 'POST',
    data: {
      ...payload,
    },
  });
}

function commentDeleteApi(payload: TargetCommentDTO) {
  return http.request<{ content: IComment }>({
    url: '/api/comment/delete',
    method: 'POST',
    data: { ...payload },
  });
}

function commentUpdateApi(payload: UpdateCommentDTO) {
  return http.request<{ content: IComment }>({
    url: '/api/comment/update',
    method: 'POST',
    data: { ...payload },
  });
}

function commentFindByDealIDApi(payload: { deal_id: number }) {
  return http.request<{ content: ICommentWithReplies[]; count: number }>({
    url: '/api/comment/query/deal',
    method: 'POST',
    data: { ...payload },
  });
}

function likeCommentApi(payload: { comment_id: number }) {
  return http.request<{ content: IComment }>({
    url: '/api/comment/like',
    method: 'POST',
    data: {
      id: payload.comment_id,
    },
  });
}

const api = {
  commentCreationAPi,
  replyCreationAPi,
  commentDeleteApi,
  commentUpdateApi,
  commentFindByDealIDApi,
  likeCommentApi,
};

export default api;
