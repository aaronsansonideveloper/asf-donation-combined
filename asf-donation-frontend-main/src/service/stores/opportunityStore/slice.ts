/* Core */
import { type PayloadAction } from 'redux-eazy';
import { IOpportunity } from 'src/service/model';
import { createSlice } from 'src/service/setup';

import thunks from './thunks';

/* Instruments */

/* Types */
export interface SliceState {
  opportunityList: IOpportunity[];
  loading: boolean;
  listPageCount: number | undefined;
}

const initialState = (): SliceState => {
  return {
    loading: false,
    opportunityList: [],
    listPageCount: undefined,
  };
};

const opportunitySlice = createSlice({
  name: 'opportunityStore',
  stateInit: initialState,
  reducers: {
    // 设置机会列表
    setOpportunityList: (state, { payload }: PayloadAction<IOpportunity[]>) => {
      state.opportunityList = payload;
    },
    setCount: (state, { payload }: PayloadAction<number>) => {
      state.listPageCount = payload;
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

export default opportunitySlice;
