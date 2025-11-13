import { http } from 'src/http';
import { IConnection, IConnectionRequestPayload } from 'src/service/model';

function ConnectionRequestApi(params: IConnectionRequestPayload) {
  return http.request<{ content: string }>({
    url: '/api/connection/request',
    method: 'POST',
    data: {
      target_user_id: params.target_user_id,
      note: params.note,
      deal_name: params.deal_name,
      deal_id: params.deal_id,
    },
  });
}

function ConnectionQueryApi(payload: { page?: number, size?: number }) {
  return http.request<{ content: IConnection[]; count: number }>({
    url: '/api/connection/query/current-user',
    method: 'POST',
    data: {
      page: payload.page,
      page_size: payload.size,
    },
  });
}

function ConnectionRequestsQueryApi(payload: { page?: number, size?: number }) {
  return http.request<{ content: IConnection[]; count: number }>({
    url: '/api/connection/query/current-user-request',
    method: 'POST',
    data: {
      page: payload.page,
      page_size: payload.size,
    },
  });
}

function ConnectionRequesedQueryApi(payload: { page?: number, size?: number }) {
  return http.request<{ content: IConnection[]; count: number }>({
    url: '/api/connection/query/current-user-requested',
    method: 'POST',
    data: {
      page: payload.page,
      page_size: payload.size,
    },
  });
}

function ConnectionRequestsIgnoredQueryApi(payload: { page?: number, size?: number }) {
  return http.request<{ content: IConnection[]; count: number }>({
    url: '/api/connection/query/current-user-ignored',
    method: 'POST',
    data: {
      page: payload.page,
      page_size: payload.size,
    },
  });
}

function ConnectionAcceptApi(params: { connection_id: number }) {
  return http.request({
    url: '/api/connection/accept',
    method: 'POST',
    data: {
      connection_id: params.connection_id,
    },
  });
}

function ConnetionIgnoreApi(params: { connection_id: number }) {
  return http.request({
    url: '/api/connection/ignore',
    method: 'POST',
    data: {
      connection_id: params.connection_id,
    },
  });
}

const api = {
  ConnectionRequestApi,
  ConnectionQueryApi,
  ConnectionRequesedQueryApi,
  ConnectionRequestsQueryApi,
  ConnectionRequestsIgnoredQueryApi,
  ConnectionAcceptApi,
  ConnetionIgnoreApi,
};

export default api;
