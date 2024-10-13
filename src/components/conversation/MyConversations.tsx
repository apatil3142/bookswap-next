"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./myConversations.module.css";
import Conversation from "./Conversation";
import ChatList from "../UserChats/chatList/ChatList";

interface ISendMessagePayload{
  senderId: string,
  receiverId: string,
  text: string,

}

const MyConversations = ({ conversations, currentUser }) => {

  const [currentConversation, setCurrentConversation] = useState<{
    _id: string;
    members: string[];
    createdAt: string;
    updatedAt: string;
  } | null>(null);

  const [selectedUserDetails, setSelectedUserDetails] = useState<{_id: string, name: string, email: string} | null>(null);

  const onConversationClickCallback = (conversation, user) => {
    setCurrentConversation(conversation);
    setSelectedUserDetails(user);
  }

  return (
    <>
      <div className={styles.chatsList}>
        <div className={styles.header}>My Chats</div>
        {conversations.map((c) => (
          <Conversation
            key={c._id}
            isSelected={c._id === currentConversation?._id}
            currentUserId={currentUser.id}
            conversation={c}
            conversessionClickCallback={onConversationClickCallback}
          />
        ))}
      </div>
      <div className={styles.chatInfo}>
        <>
          <div className={styles.header}>
            <div className={styles.userProfile}>{selectedUserDetails?.name[0].toUpperCase()}</div>
            {selectedUserDetails?.name}
          </div>
          <div className={styles.chatBgImage} />
          {currentConversation ? (
            <ChatList
              currentConversation={currentConversation}
              userId={currentUser.id}
              // sendMessageToSocket={sendMessageToSocket}
            />
          ) : (
            <div className={styles.notFound}>Please click on user to view messages & start conversation.</div>
          )}
        </>
      </div>
    </>
  );
};

export default MyConversations;
