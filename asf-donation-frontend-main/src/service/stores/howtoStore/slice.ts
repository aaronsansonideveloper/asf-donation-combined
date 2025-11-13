/* Core */
import { PayloadAction } from 'redux-eazy';
import { createSlice } from 'src/service/setup';


/* Types */
export interface SliceState {
  currentVideoId: string;
}

const initialState = (): SliceState => {
  return {
    currentVideoId: '',
  };
};

const howtoSlice = createSlice({
  name: 'howtoStore',
  stateInit: initialState,
  reducers: {
    setCurrentVideoId: (state, action: PayloadAction<string>) => {
      state.currentVideoId = action.payload;
    },
  },
});

export default howtoSlice;
