/* Instruments */
import { createThunks } from 'src/service/setup';

import httpApi from './api';
import { dp } from 'src/service';

const thunks = createThunks("categoryStore", {
  categoryFindAllAct: async () => {
    const {
      data: { content },
    } = await httpApi.categoryFindAllApi();
    const { allPrimeCategory, allChildCategory, allParentCategory } = content;
    dp('categoryStore', 'setAllChildCategory', allChildCategory);
    dp('categoryStore', 'setAllParentCategory', allParentCategory);
    dp('categoryStore', 'setAllPrimeCategory', allPrimeCategory);
  },
});

export default thunks;
