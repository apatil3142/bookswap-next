'use client'

import React, { useEffect, useState } from 'react'
import styles from './conversation.module.css';

// const get

const Conversation = ({isSelected,conversation, currentUserId, conversessionClickCallback}) => {
  const [user,setUser] = useState<{name: string, email: string, _id: string} | null>(null);
  
  useEffect(() => {
    const getUserDetails = async () => {
      const friendId = conversation.members.find(m => m !== currentUserId)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${friendId}`);
        const data = await response.json();
        if(data){
          setUser(data)
        }
      } catch (error) {
        console.log(error);
      }
    }

    getUserDetails();

  },[currentUserId, conversation]);

  const handleConversationClick = () => {
    conversessionClickCallback(conversation, user)
  }
  
  return (
    <div className={`${styles.container} ${ isSelected ? styles.selected : ''}`} onClick={handleConversationClick}>
      {user &&<><div className={styles.userProfile}>{user?.name[0].toUpperCase()}</div><div>{user.name}</div></>}
    </div>
  )
}

export default Conversation
