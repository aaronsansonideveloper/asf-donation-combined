/* Instruments */
import { dp } from 'src/service';

import { IConnectionRequestPayload } from 'src/service/model';
import { createThunks } from 'src/service/setup';
import httpApi from './api';

const thunks = createThunks('connectionStore', {
  // query all the connections, wont be used normally
  connectionQueryAct: async (_, api) => {
    const {
      data: { content, count },
    } = await httpApi.ConnectionQueryApi({
      page: 1,
      size: 2000,
    });
    dp('connectionStore', 'setConnection', { content, count });
  },

  // query the connection requests
  connectionRequestsQueryAct: async () => {
    const {
      data: { content, count },
    } = await httpApi.ConnectionRequestsQueryApi({
      page: 1,
      size: 2000,
    });
    dp('connectionStore', 'setConnectionRequests', { content, count });
  },

  // query the connection requests received
  connectionRequestedQueryAct: async () => {
    const {
      data: { content, count },
    } = await httpApi.ConnectionRequesedQueryApi({
      page: 1,
      size: 2000,
    });
    dp('connectionStore', 'setConnectionRequested', { content, count });
  },

  // query the connection requests ignored
  connectionRequestsIgnoredQueryAct: async () => {
    const {
      data: { content, count },
    } = await httpApi.ConnectionRequestsIgnoredQueryApi({
      page: 1,
      size: 2000,
    });
    dp('connectionStore', 'setConnectionIgnored', { content, count });
  },

  // act to send a connection request
  connectionRequestAct: async (payload: IConnectionRequestPayload) => {
    await httpApi.ConnectionRequestApi(payload);
  },

  // act to accept a connection request
  connectionAcceptAct: async (params: { connection_id: number }) => {
    // set the loading state to true
    await httpApi.ConnectionAcceptApi(params);
    dp('connectionStore', 'connectionQueryAct');
    dp('connectionStore', 'connectionRequestsQueryAct');
    dp('connectionStore', 'connectionRequestedQueryAct');
    dp('connectionStore', 'connectionRequestsIgnoredQueryAct');
  },

  // act to ignore a connection request
  connectionIgnoreAct: async (params: { connection_id: number }) => {
    const {
      data: { content, count },
    } = await httpApi.ConnetionIgnoreApi(params);
    dp('connectionStore', 'connectionQueryAct');
    dp('connectionStore', 'connectionRequestedQueryAct');
    dp('connectionStore', 'connectionRequestsIgnoredQueryAct');
  },
});

export default thunks;
