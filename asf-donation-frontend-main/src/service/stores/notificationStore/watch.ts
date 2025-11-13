import { createMatcher } from 'redux-eazy';
import { dp, getActionType } from 'src/service';
import { startAppListening } from 'src/service/setup';
import { SliceState } from './slice';

const watch = () => {
  startAppListening({
    // 如果点击Notification，则视为已经Read
    matcher: createMatcher<SliceState>((action) => {
      let flag =
        action.type === getActionType('notificationStore').notificationReadAct.fulfilled ||
        action.type === getActionType('notificationStore').notificationDeleteAct.fulfilled;
      return flag;
    }),
    //
    effect: (_, api) => {
      dp('notificationStore', 'notificationQueryAct', {});
    },
  });
};

export default watch;
