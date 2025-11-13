import { useEffect, useRef } from 'react';
import { useFlatInject } from 'src/service';
import Talk from 'talkjs';

const ChatFunction = () => {
  const { userInfo } = useFlatInject('authStore');

  useEffect(() => {
    let a = Talk.User;
    const otherUser = new Talk.User({
      id: '2234',
      name: 'Kate',
      email: 'kate.russell@sansoni.com',
      photoUrl:
        'https://pps.whatsapp.net/v/t61.24694-24/304781514_132107959564777_1495778221657466904_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdTcRP1v56JJ-GWbqPOk-mrlyg01tpHztHbgE0e0SEW5NA&oe=651DDAE2&_nc_sid=000000&_nc_cat=103',
      role: 'default',
    });

    const currentUser = new Talk.User({
      id: userInfo?.id.toString() || 'loading user info',
      name: userInfo?.email || 'loading user info',
      email: userInfo?.email || 'loading user info',
      photoUrl: userInfo?.metadata?.avatar || 'url',
      welcomeMessage: 'Hey there! How are you? :-)',
      role: 'default',
    });
    Talk.ready.then(() => {
      const session = new Talk.Session({
        appId: 'tI2wVupK',
        me: currentUser,
      });

      const conversation = session.getOrCreateConversation(Talk.oneOnOneId(currentUser, otherUser));

      conversation.setParticipant(currentUser);
      // conversation.setParticipant(otherUser);

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatContainer.current);
    });
  }, []);

  const chatContainer = useRef(null);

  return (
    <div>
      <div ref={chatContainer} style={{ height: '800px' }}></div>
    </div>
  );
};

export default ChatFunction;
