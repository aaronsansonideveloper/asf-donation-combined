import axios from 'axios';
import notify from 'src/common/utils/notify';
import storageHelper from 'src/common/utils/storageHelper';
import { paths } from 'src/routes/paths';
import { overrideHttpType } from './overrideHttpType';
export const controller = new AbortController();
const _http = axios.create({
  timeout: 1000 * 30,
  signal: controller.signal,
});

_http.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    throw err;
  }
);

_http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    const { response } = err;
    const { status, data } = response || {};
    if (Array.isArray(data?.message)) {
      data?.message.forEach((mes: string) => {
        notify.error(mes);
      });
    } else {
      if (err?.message !== 'canceled') {
        notify.error(data?.message || err?.message || 'net error');
      }
    }
    if (status == 401) {
      storageHelper.clear();
      storageHelper.clear('local');
      if (!window.location.pathname.includes('share')) {
        window.location.href = paths.loginCover;
      }
    }
    throw err;
  }
);

const httpBase = overrideHttpType(_http);

export const http = httpBase;
