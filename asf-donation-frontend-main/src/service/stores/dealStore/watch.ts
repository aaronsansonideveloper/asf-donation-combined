import { createMatcher } from 'redux-eazy';
import { dp, getActionType } from 'src/service';
import { startAppListening } from 'src/service/setup';
import { PaginationData } from './model';

const watch = () => {
  // 监听Pagination信息改变
  startAppListening({
    matcher: createMatcher<PaginationData>((action) => {
      if (
        action.type == getActionType('dealStore').setDealComentPagination &&
        action.payload.pageNum !== undefined
      ) {
        return true;
      }
      if (
        action.type == getActionType('commentStore').likeDealByIDAct.fulfilled ||
        action.type == getActionType('commentStore').createCommentAct.fulfilled ||
        action.type == getActionType('commentStore').createReplyAct.fulfilled
      ) {
        return true;
      }
      return false;
    }),
    effect: (_, state) => {
      if (state.getState().authStore.token) {
        dp('dealStore', 'queryCommentList');
      }
    },
  });

  startAppListening({
    matcher: createMatcher((action) => {
      let flag = action.type == getActionType('dealStore').likeDealAct.fulfilled;
      return flag;
    }),
    effect: (_, state) => {
      const { currentDealId } = state.getState().dealStore;
      if (currentDealId) {
        dp('dealStore', 'queryDealDetailAct', { id: currentDealId });
      }
    },
  });

  startAppListening({
    matcher: createMatcher((action) => {
      let flag = action.type == getActionType('dealStore').archiveDealAct.fulfilled;
      return flag;
    }),
    effect: (_, state) => {
      dp('dealStore', 'queryDealForDashboardAct');
    },
  });

  startAppListening({
    matcher: createMatcher((action) => {
      let flag = action.type == getActionType('dealStore').likeDealAct.fulfilled;
      return flag;
    }),
    effect: (_, state) => {
      dp('dealStore', 'queryDealForDashboardAct');
    },
  });
};

export default watch;
