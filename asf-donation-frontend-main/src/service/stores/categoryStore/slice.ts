/* Core */
import { type PayloadAction } from 'redux-eazy';

/* Instruments */
import { ICategory } from 'src/service/model';
import { createSlice } from 'src/service/setup';
import thunks from './thunks';


/* Types */
export interface SliceState {
  allChildCategory: ICategory[];
  allPrimeCategory: ICategory[];
  allParentCategory: ICategory[];
  loading: boolean;
}

const initialState = (): SliceState => {
  return {
    allChildCategory: [],
    allPrimeCategory: [],
    allParentCategory: [],
    loading: false,
  };
};

const categorySlice = createSlice({
  name: "categoryStore",
  stateInit: initialState,
  reducers: {
    setAllPrimeCategory: (state, action: PayloadAction<ICategory[]>) => {
      const { payload } = action;
      state.allPrimeCategory = payload;
    },
    setAllChildCategory: (state, action: PayloadAction<ICategory[]>) => {
      const { payload } = action;
      state.allChildCategory = payload;
    },
    setAllParentCategory: (state, action: PayloadAction<ICategory[]>) => {
      const { payload } = action;
      state.allParentCategory = payload;
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

export default categorySlice;
