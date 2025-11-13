/* Instruments */
import { dp, dpChain } from 'src/service';
import { createThunks } from 'src/service/setup';

import httpApi from './api';
import { INotificationQueryParams, ITargetNotification } from './model';

const thunks = createThunks('notificationStore', {
  notificationQueryAct: async (searchParams: INotificationQueryParams) => {
    const {
      data: { content, count },
    } = await httpApi.NotificationQueryApi(searchParams);
    dpChain('notificationStore').setNotification({ content, count });
  },
  notificationReadAct: async (searchParams: ITargetNotification) => {
    const {
      data: { content },
    } = await httpApi.NotificationReadApi(searchParams);
  },
  notificationDeleteAct: async (searchParams: ITargetNotification) => {
    const {
      data: { content },
    } = await httpApi.NotificationDeleteApi(searchParams);
  },
});

export default thunks;
