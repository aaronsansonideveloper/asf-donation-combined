import { type PayloadAction } from 'redux-eazy';
import { createSlice } from 'src/service/setup';
import { INotification } from './model';
import thunks from './thunks';
export interface SliceState {
  notification: INotification[]; // all notifications
  count: number;
  count_new: number;
  loading: boolean;
}

const initialState = (): SliceState => {
  return {
    notification: [],
    count: 0,
    count_new: 0,
    loading: false,
  };
};

const notificationSlice = createSlice({
  name: 'notificationStore',
  stateInit: initialState,
  reducers: {
    setNotification: (
      state,
      action: PayloadAction<{ content: INotification[]; count: number }>
    ) => {
      const { payload } = action;
      state.notification = payload.content;
      state.count = payload.count;
      // count new notifications
      state.count_new = payload.content.filter((item) => !item.is_read).length;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(thunks.notificationQueryAct.pending, (state) => {
        state.loading = true;
      })
      .addCase(thunks.notificationQueryAct.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(thunks.notificationQueryAct.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default notificationSlice;
