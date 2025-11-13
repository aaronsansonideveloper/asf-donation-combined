'use client';

import { useEffect, useRef } from 'react';
import storageHelper from 'src/common/utils/storageHelper';
import { useFlatInject } from 'src/service';

const App = (props: React.PropsWithChildren) => {
  const { token } = useFlatInject('authStore');
  const { notificationQueryAct } = useFlatInject('notificationStore');

  const notificationLoop = useRef<null | NodeJS.Timeout>(null);

  const startLoop = () => {
    stopLoop();
    notificationLoop.current = setInterval(() => {
      if (storageHelper.getItem('ACCESS_TOKEN', 'local')) {
        notificationQueryAct();
      }
    }, 15000);
  };

  const stopLoop = () => {
    if (notificationLoop.current) {
      clearInterval(notificationLoop.current);
    }
  };

  useEffect(() => {
    // 这个 if(token) 就是在判断用户是否已经登陆
    if (token) {
      startLoop();
    } else {
      stopLoop();
    }
    return () => {
      stopLoop();
    };
  }, [token]);
  return <>{props.children}</>;
};

const ServiceProvider = (props: React.PropsWithChildren) => {
  return <App>{props.children}</App>;
};

export default ServiceProvider;
