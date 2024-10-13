'use client'
import React, { useEffect, useRef, useState } from 'react';
import styles from './chatList.module.css';
import { IoSendSharp } from 'react-icons/io5';
import {io} from 'socket.io-client';

export interface IMessage {
  conversationId?: string,
  sender: string | undefined,
  text: string,
  createdAt: string
}

const ChatList = ({currentConversation, userId}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState<IMessage | null>(null);
  const socketRef = useRef<any>(null);
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    socketRef.current = io('ws://localhost:8900');
    socketRef.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now().toString(),
      });
    });
  },[]);

  useEffect(() => {
    socketRef.current.emit("addUser", userId);
  }, [userId]);

  useEffect(() => {
    if(arrivalMessage && currentConversation?.members.includes(arrivalMessage.sender)){
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentConversation]);

  // const sendMessageToSocket = ({senderId, receiverId, text}) => {
  //   socketRef.current.emit("sendMessage", {
  //     senderId,
  //     receiverId,
  //     text,
  //   });
  // }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/messages/'+currentConversation._id);
        const data = await res.json();
        if(data){
          setMessages(data);
        }
      } catch (error) {
        console.log(error)
      }
    };
    fetchMessages();
  },[currentConversation._id]);

  const handleSendMessage = async () => {
    try {
      const payload = {
        conversationId: currentConversation._id,
        sender: userId,
        text: newMessage,
      }
      const receiverId = currentConversation.members.find(
        (member) => member !== userId
      );
      socketRef.current.emit("sendMessage", {
        senderId: userId,
        receiverId,
        text: newMessage,
      });
      const myMessage = await fetch('http://localhost:3000/api/messages', {
        method: 'post',
        body:JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json', // Set content type as JSON
        },
      });
      const data = await myMessage.json();

      if(data){
        setMessages(prev => [...prev, data])
        setNewMessage('');
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className={styles.chatsContainer}>
      {messages.map((message, index) => (
          <div key={index} className={`${styles.chatWrapper} ${userId === message.sender ? styles.isOwner : styles.notOwner}`}>
            <div className={`${styles.message} ${userId === message.sender ? styles.messageOwner : styles.notMessageOwner}`}>{message.text}</div>
          </div>
        ))}
        <div ref={scrollRef}/>
      </div>
      <div className={styles.chatFooter}>
        <input className={styles.textInput} type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}  />
        <IoSendSharp size={30} onClick={handleSendMessage}  />
      </div>
    </>
  )
}

export default ChatList
