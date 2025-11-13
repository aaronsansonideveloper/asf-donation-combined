import { http } from 'src/http';
import { ICategory } from 'src/service/model';

function categoryFindAllApi() {
  return http.request<{
    content: {
      allChildCategory: ICategory[];
      allParentCategory: ICategory[];
      allPrimeCategory: ICategory[];
    };
  }>({
    url: '/api/category/find/all',
    method: 'POST',
  });
}

const api = {
  categoryFindAllApi,
};

export default api;
