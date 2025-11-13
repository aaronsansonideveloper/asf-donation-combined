/* Core */

/* Instruments */
import { PayloadAction } from 'redux-eazy';
import { IUserEnquiry } from 'src/service/model';

import { createSlice } from 'src/service/setup';
import thunks from './thunks';

/* Types */
export interface SliceState {
  totalCount: number;
  user_enquiry: IUserEnquiry[];
  loading: boolean;
}

const initialState = (): SliceState => {
  return {
    totalCount: 0,
    user_enquiry: [],
    loading: false,
  };
};

const user_enquirySlice = createSlice({
  name:'user_enquiryStore',
  stateInit: initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      const { payload } = action;
      state.totalCount = payload;
    },
    setUserEnquiry: (state, action: PayloadAction<IUserEnquiry[]>) => {
      const { payload } = action;
      state.user_enquiry = payload;
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

export default user_enquirySlice;
