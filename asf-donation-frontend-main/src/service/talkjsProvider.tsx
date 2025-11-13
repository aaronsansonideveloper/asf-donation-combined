'use client';
import { Session, useUnreads } from '@talkjs/react';
import { takjs_secret, talkjs_token } from 'configs';
import crypto from 'crypto';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import Talk from 'talkjs';
import { useFlatInject } from '.';

export function TalkProvider(props: PropsWithChildren) {
  const { userInfo } = useFlatInject('authStore');
  const [token, setToken] = useState<string>('0');

  useEffect(() => {
    if (userInfo?.id) {
      setToken(
        crypto
          .createHmac('sha256', takjs_secret as string)
          .update(userInfo.id.toString())
          .digest('hex')
      );
    }
  }, [userInfo]);

  const syncUser = useCallback(
    () =>
      new Talk.User({
        id: userInfo?.id ? userInfo.id.toString() : '0',
        name: userInfo?.first_name ? userInfo.first_name : 'Loading...',
        email: userInfo?.email ? userInfo.email : 'Loading...',
        photoUrl: userInfo?.metadata?.avatar || 'https://demo.talkjs.com/img/11.jpg',
        welcomeMessage: null,
        role: 'default',
      }),
    [userInfo]
  );

  return (
    <>
      <Session appId={talkjs_token} signature={token} syncUser={syncUser}>
        {props.children}
      </Session>
    </>
  );
}

export function useTalkJSNotification() {
  const unreads = useUnreads();

  return {
    count: unreads ? unreads.length : 0,
    messages: unreads ? unreads : [],
  };
}
