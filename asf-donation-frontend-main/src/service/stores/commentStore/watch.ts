import { createMatcher } from 'redux-eazy';
import { getActionType } from 'src/service';
import { startAppListening } from 'src/service/setup';
import { SliceState } from './slice';

const watch = () => {
  startAppListening({
    matcher: createMatcher<SliceState>((action) => {
      let flag =
        action.type == getActionType('commentStore').createCommentAct.fulfilled ||
        action.type == getActionType('commentStore').createReplyAct.fulfilled;
      return flag;
    }),
    effect: (_) => {
      // todo,  如何动态的获取另一个store的数据 同时用在当前的watch中
    },
  });
};

export default watch;
