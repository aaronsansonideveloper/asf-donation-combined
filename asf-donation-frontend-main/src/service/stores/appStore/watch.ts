import { getActionType } from 'src/service';
import { startAppListening } from 'src/service/setup';

const watch = () => {
  startAppListening({
    type: getActionType('authStore').setToken,
    effect: () => {},
  });
};

export default watch;
