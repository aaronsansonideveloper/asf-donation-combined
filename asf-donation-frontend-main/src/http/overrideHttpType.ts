import type { AxiosInstance, AxiosRequestConfig } from 'axios';

export type ResponseBodyType<D> = {
  data: D;
  code: string | number;
  message: null | string;
};

export const overrideHttpType = (_http: AxiosInstance) => {
  // rewrite axios's type
  type GetParams = Parameters<typeof _http.get>;
  type PostParams = Parameters<typeof _http.post>;
  type PatchParams = Parameters<typeof _http.patch>;
  type DeleteParams = Parameters<typeof _http.delete>;
  type HeadParams = Parameters<typeof _http.head>;
  type PutParams = Parameters<typeof _http.put>;

  type ResponseBody<D, P> = P extends { [key: string]: any }
    ? ResponseBodyType<D> & P
    : ResponseBodyType<D>;

  const _overrideHttpType = <D extends any = any, T = ResponseBodyType<D>>(
    config: AxiosRequestConfig
  ) => _http<T, T>(config);
  _overrideHttpType.request = <
    D extends any = any,
    P extends { [key: string]: any } = {},
    T = ResponseBody<D, P>,
  >(
    config: AxiosRequestConfig
  ) => _http.request<T, T & { error: Error }>(config);
  _overrideHttpType.get = <D extends any = any, T = ResponseBodyType<D>>(...arg: GetParams) =>
    _http.get<T, T & { error: Error }>(...arg);
  _overrideHttpType.post = <D extends any = any, T = ResponseBodyType<D>>(...arg: PostParams) =>
    _http.post<T, T & { error: Error }>(...arg);
  _overrideHttpType.patch = <D extends any = any, T = ResponseBodyType<D>>(...arg: PatchParams) =>
    _http.patch<T, T & { error: Error }>(...arg);
  _overrideHttpType.delete = <D extends any = any, T = ResponseBodyType<D>>(...arg: DeleteParams) =>
    _http.delete<T, T & { error: Error }>(...arg);
  _overrideHttpType.head = <D extends any = any, T = ResponseBodyType<D>>(...arg: HeadParams) =>
    _http.head<T, T & { error: Error }>(...arg);
  _overrideHttpType.put = <D extends any = any, T = ResponseBodyType<D>>(...arg: PutParams) =>
    _http.put<T, T & { error: Error }>(...arg);

  type HttpType = typeof _overrideHttpType;
  return _http as HttpType;
};
