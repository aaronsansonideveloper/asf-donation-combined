/* Instruments */
import { createThunks } from 'src/service/setup';

import httpApi from './api';
import { dp } from 'src/service';
import { CreateCommentDTO, CreateReplyDTO, TargetCommentDTO, UpdateCommentDTO } from './model';

const thunks = createThunks("commentStore", {
  createCommentAct: async (payload: CreateCommentDTO) => {
    dp('commentStore', 'setLoading', true);
    const {
      data: { content },
    } = await httpApi.commentCreationAPi(payload);
    dp('commentStore', 'setLoading', false);
  },
  createReplyAct: async (payload: CreateReplyDTO) => {
    dp('commentStore', 'setLoading', true);
    const {
      data: { content },
    } = await httpApi.replyCreationAPi(payload);
    dp('commentStore', 'setLoading', false);
  },
  deleteCommentAct: async (payload: TargetCommentDTO) => {
    const {
      data: { content },
    } = await httpApi.commentDeleteApi(payload);
  },
  updateCommentAct: async (payload: UpdateCommentDTO) => {
    const {
      data: { content },
    } = await httpApi.commentUpdateApi(payload);
  },
  findByDealIDAct: async (payload: { deal_id: number }) => {
    const {
      data: { content, count },
    } = await httpApi.commentFindByDealIDApi(payload);
    dp('commentStore', 'setComments', content);
    dp('commentStore', 'setCommentsCount', count);
  },
  likeDealByIDAct: async (payload: { comment_id: number }) => {
    const {
      data: { content },
    } = await httpApi.likeCommentApi(payload);
  },
});

export default thunks;
