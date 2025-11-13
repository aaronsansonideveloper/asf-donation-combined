import { FileUploadApiRequest, FileUploadApiRespone } from 'src/service/model/appStoreModel';
import { IGeo } from 'src/service/model/geo';
import { QueryGeoRequest } from 'src/service/model/model';
import { http } from 'src/http';

function geoQueryApi(params: QueryGeoRequest) {
  return http.request<IGeo[]>({
    url: '/api/geo/query',
    method: 'POST',
    data: params,
  });
}

function fileUploadApi(url: string, params: File) {
  return http.put(url, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

function getUploadUrlApi(params: FileUploadApiRequest) {
  return http.request<{ content: FileUploadApiRespone }>({
    url: '/api/file/get/uploadUrl',
    method: 'POST',
    data: params,
  });
}

const api = {
  getUploadUrlApi,
  geoQueryApi,
  fileUploadApi,
};

export default api;
