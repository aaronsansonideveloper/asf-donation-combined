/* Core */
import { type PayloadAction } from 'redux-eazy';

import thunks from './thunks';
import { IComment, ICommentWithReplies } from './model';
import { createSlice } from 'src/service/setup';

/* Types */
export interface SliceState {
  loading: boolean;
  comments: ICommentWithReplies[];
  comment_count: number;
  comments_currentUser: IComment[];
  comments_currentUser_count: number;
}

const initialState = (): SliceState => {
  return {
    loading: true,
    comments: [],
    comment_count: 0,

    comments_currentUser: [],
    comments_currentUser_count: 0,
  };
};

// export type CommentSlice = typeof commentSlice;

const commentSlice = createSlice({
  name: "commentStore",
  stateInit: initialState,
  reducers: {
    // 设置是否是
    setLoading(state, action: PayloadAction<boolean>) {
      const { payload } = action;
      state.loading = payload;
    },
    setComments(state, action: PayloadAction<ICommentWithReplies[]>) {
      const { payload } = action;
      state.comments = payload;
    },
    setCommentsCount(state, action: PayloadAction<number>) {
      const { payload } = action;
      state.comment_count = payload;
    },

    setCurrentUserComments(state, action: PayloadAction<IComment[]>) {
      const { payload } = action;
      state.comments_currentUser = payload;
    },
    setCurrentUserCommentsCount(state, action: PayloadAction<number>) {
      const { payload } = action;
      state.comments_currentUser_count = payload;
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

export default commentSlice;
