import { http } from 'src/http';
import { INotification, INotificationQueryParams, ITargetNotification } from './model';

function NotificationQueryApi(searchParams: INotificationQueryParams) {
  return http.request<{ content: INotification[]; count: number }>({
    url: '/api/notification/query/current-user',
    method: 'POST',
    data: {
      ...searchParams,
    },
  });
}

function NotificationReadApi(searchParams: ITargetNotification) {
  return http.request<{ content: INotification[]; count: number }>({
    url: '/api/notification/read',
    method: 'POST',
    data: {
      ...searchParams,
    },
  });
}

function NotificationDeleteApi(searchParams: ITargetNotification) {
  return http.request<{ content: INotification[]; count: number }>({
    url: '/api/notification/delete',
    method: 'POST',
    data: {
      ...searchParams,
    },
  });
}

const api = {
  NotificationQueryApi,
  NotificationDeleteApi,
  NotificationReadApi,
};

export default api;
