/* Core */
import { type PayloadAction } from 'redux-eazy';
import { IConnection } from 'src/service/model';

import thunks from './thunks';
import { createSlice } from 'src/service/setup';

/* Types */
export interface SliceState {
  connectionFilter: string | null;
  connection: IConnection[]; // connection already made
  connectionRequests: IConnection[]; // connection requests sent
  connectionRequested: IConnection[]; // connection requests received
  connectionIgnored: IConnection[]; // connection requests received but ignored
  count: number;
  requestCount: number;
  requestedCount: number;
  connectionLoading: boolean;
  requestsLoading: boolean;
  ignoredLoading: boolean;
}

const initialState = (): SliceState => {
  return {
    connectionFilter: null,
    connection: [],
    connectionRequests: [],
    connectionRequested: [],
    connectionIgnored: [],
    count: 0,
    requestCount: 0,
    requestedCount: 0,
    connectionLoading: false,
    requestsLoading: false,
    ignoredLoading: false,
  };
};

const connectionSlice = createSlice({
  name: 'connectionStore',
  stateInit: initialState,
  reducers: {
    setConnection: (state, action: PayloadAction<{ content: IConnection[]; count: number }>) => {
      const { payload } = action;
      state.connection = payload.content;
      state.count = payload.count;
    },

    setConnectionRequests: (
      state,
      action: PayloadAction<{ content: IConnection[]; count: number }>
    ) => {
      const { payload } = action;
      state.connectionRequests = payload.content;
      state.requestCount = payload.count;
    },

    setConnectionRequested: (
      state,
      action: PayloadAction<{ content: IConnection[]; count: number }>
    ) => {
      const { payload } = action;
      state.connectionRequested = payload.content;
      state.requestedCount = payload.count;
    },

    setConnectionIgnored: (
      state,
      action: PayloadAction<{ content: IConnection[]; count: number }>
    ) => {
      const { payload } = action;
      state.connectionIgnored = payload.content;
    },

    setConenctionFilter: (state, action: PayloadAction<string>) => {
      state.connectionFilter = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(thunks.connectionQueryAct.pending, (state) => {
        state.connectionLoading = true;
      })
      .addCase(thunks.connectionQueryAct.fulfilled, (state, action) => {
        state.connectionLoading = false;
      })
      .addCase(thunks.connectionQueryAct.rejected, (state, action) => {
        state.connectionLoading = false;
      });
    builder
      .addCase(thunks.connectionIgnoreAct.pending, (state) => {
        state.ignoredLoading = true;
      })
      .addCase(thunks.connectionIgnoreAct.fulfilled, (state, action) => {
        state.ignoredLoading = false;
      })
      .addCase(thunks.connectionIgnoreAct.rejected, (state, action) => {
        state.ignoredLoading = false;
      });
    builder
      .addCase(thunks.connectionRequestAct.pending, (state) => {
        state.requestsLoading = true;
      })
      .addCase(thunks.connectionRequestAct.fulfilled, (state, action) => {
        state.requestsLoading = false;
      })
      .addCase(thunks.connectionRequestAct.rejected, (state, action) => {
        state.requestsLoading = false;
      });
  },
});

export default connectionSlice;
