import { createMatcher } from 'redux-eazy';
import { dp, dpChain, getActionType } from 'src/service';
import { startAppListening } from 'src/service/setup';
import { SliceState } from './model';

const watch = () => {
  startAppListening({
    matcher: createMatcher<SliceState>((action) => {
      let flag =
        action.type == getActionType('dealStore').likeDealAct.fulfilled ||
        action.type == getActionType('authStore').userUpdateAct.fulfilled ||
        action.type == getActionType('authStore').changePasswdAct.fulfilled ||
        action.type == getActionType('opportunityStore').opportunityWishAct.fulfilled ||
        action.type == `${getActionType('authStore').setToken}`;
      return flag;
    }),
    effect: (_, state) => {
      if (state.getState().authStore.token) {
        dp('authStore', 'userInfoMemberAct');
      }
    },
  });
  startAppListening({
    matcher: createMatcher<SliceState>((action) => {
      return action.type == getActionType('authStore').setRole;
    }),
    effect: (action) => {
      if (action.payload.name == 'free') {
        dpChain('appStore').setIsShowUpgrade(true);
      }
    },
  });
  startAppListening({
    matcher: createMatcher<SliceState>((action) => {
      return action.type == getActionType('authStore').fromInteractionAct.fulfilled;
    }),
    effect: () => {
      dpChain('authStore').queryConnectionCountAct(null);
    },
  });
  startAppListening({
    matcher: createMatcher<SliceState>((action) => {
      return action.type == getActionType('authStore').paymentVerifyAct.fulfilled;
    }),
    effect: () => {
      dpChain('authStore').getCurrentUserPermissionAct(null);
    },
  });
};

export default watch;
