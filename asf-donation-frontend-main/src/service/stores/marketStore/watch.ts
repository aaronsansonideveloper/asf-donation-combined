import { createMatcher } from 'redux-eazy';
import { dp, dpChain, getActionType } from 'src/service';
import { startAppListening } from 'src/service/setup';
import { SliceState } from './model';

const watch = () => {
  // 监听筛选类别，类别一变，就重制页码
  // 页码一动进而触发重新请求列表
  startAppListening({
    matcher: createMatcher<SliceState>((action) => {
      let flag =
        action.type == `${getActionType('marketStore').setMarketDealType}` ||
        action.type == getActionType('marketStore').resetSearchFilter;
      return flag;
    }),
    effect: (_, state) => {
      if (state.getState().authStore.token) {
        dp('marketStore', 'setMarketListPageNum', 1);
      }
    },
  });

  // 监听翻页
  startAppListening({
    matcher: createMatcher<SliceState>((action) => {
      let flag = action.type == `${getActionType('marketStore').setMarketListPageNum}`;
      return flag;
    }),
    effect: async (_, state) => {
      if (state.getState().authStore.token) {
        dp('marketStore', 'marketQueryListAct');
      }
    },
  });

  startAppListening({
    matcher: createMatcher<SliceState>((action) => {
      let flag = action.type == getActionType('dealStore').likeDealAct.fulfilled;
      return flag;
    }),
    effect: async (_, state) => {
      if (state.getState().authStore.token) {
        dp('marketStore', 'marketQueryListAct');
      }
    },
  });
};
export default watch;
