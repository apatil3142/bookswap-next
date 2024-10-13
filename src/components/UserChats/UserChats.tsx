'use client'
import { useCallback, useEffect, useState } from 'react';
import Button from '../inputs/button/Button';
import styles from './userChats.module.css';
import { IConversation } from '@/lib/interface';
import ChatList from './chatList/ChatList';

const UserChats = ({name, session, bookOwnerId}) => {
  const [currentConversation, setCurrentConversation] = useState<IConversation | null>(null);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/conversation/${session?.user?.id}`);
        const data = await response.json();
        if (data?.length) {
          const isConversationPresentForBookOwner = data.find(
            (conversation: IConversation) =>
              conversation.members.includes(bookOwnerId as string)
          );
          if (isConversationPresentForBookOwner) {
            setCurrentConversation(isConversationPresentForBookOwner);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } 
    getConversation();
  },[session?.user?.id, bookOwnerId]);

  const handleStartConversationClick = useCallback(async() => {
    try {
      if (!session?.user?.id || !bookOwnerId) {
        throw new Error("Logged in userId or book ownerId not found");
      }
      const payload = {
        senderId: session?.user?.id,
        receiverId: bookOwnerId,
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/conversation/`, {
        method: 'post',
        body: JSON.stringify(payload), // Convert the payload to a JSON string
        headers: {
          'Content-Type': 'application/json', // Set content type as JSON
        },
      });
      const data = await response.json();
      if(data){
        setCurrentConversation(data);
      }
    } catch (error) {
      console.log('Error while starting conversation: ', error)
    }
  },[session?.user?.id, bookOwnerId]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.userProfile}>{name[0].toUpperCase()}</div>
        {name}
      </div>
      <div className={styles.chatBgImage} />
      {
        currentConversation ? 
        <ChatList currentConversation={currentConversation} userId={session?.user?.id} />:
        <div className={styles.notFound}>
          <div className={styles.text}>{"You don't have any conversation with this user."}</div>
          <Button onClick={handleStartConversationClick}>Start Conversation</Button>
        </div>

      }
    </>
  )
}

export default UserChats;