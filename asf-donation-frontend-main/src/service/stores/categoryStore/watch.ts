import { ListenerMiddleware } from 'redux-eazy';
import { startAppListening } from 'src/service/setup';

const watch = () => {
  startAppListening({
    predicate: (action, currentState, previousState) => {
      // return true when the listener should run
      return false;
    },
    effect: async (action, listenerApi) => {},
  });
};

export default watch;
