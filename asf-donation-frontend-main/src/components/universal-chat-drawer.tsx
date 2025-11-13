import { useCallback } from 'react';

import { Inbox, useUnreads } from '@talkjs/react';
import Talk from 'talkjs';

export interface ConnectionChatProps {
  oppositeUser: {
    id: number;
    request_message?: string;
  };
}

export const ChatInboxUniversal = () => {
  const unreads = useUnreads();
  const syncConversation = useCallback((session: Talk.Session) => {
    // regular TalkJS JavaScript code here
    const conversation = session.getOrCreateConversation('welcome');
    conversation.setParticipant(session.me);
    return conversation;
  }, []);

  return (
    <Inbox
      style={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        padding: 0,
        margin: 0,
      }}
    />
  );
};
