/* Core */
import { PayloadAction } from 'redux-eazy';

import { createSlice } from 'src/service/setup';
import thunks from './thunks';

export interface ITalkjsUser {
  talkjs_token: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string | null;
}

/* Types */
export interface SliceState {
  user_talkjs: ITalkjsUser | null;
  loading: boolean;
}

const initialState = (): SliceState => {
  return {
    user_talkjs: null,
    loading: false,
  };
};

const userSlice = createSlice({
  name: 'userStore',
  stateInit: initialState,
  reducers: {
    setUserTalkjs: (
      state,
      action: PayloadAction<{
        content: ITalkjsUser;
      }>
    ) => {
      const { payload } = action;
      state.user_talkjs = payload.content;
    },
  },

  extraReducers: (builder) => {
    Object.values(thunks).forEach((thk) => {
      builder
        .addCase(thk.pending, (state) => {
          state.loading = true;
        })
        .addCase(thk.fulfilled, (state, action) => {
          state.loading = false;
        })
        .addCase(thk.rejected, (state, action) => {
          state.loading = false;
        });
    });
  },
});

export default userSlice;
