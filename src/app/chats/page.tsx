import { auth } from '@/lib/auth';
import styles from './chats.module.css';
import MyConversations from '@/components/conversation/MyConversations';

const getConversations = async (userId) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/conversation/${userId}`);
  const data = await response.json();
  return data;
}

const Chats = async () => {

  const session = await auth();
  const conversations = await getConversations(session?.user?.id);

  return (
    <div className={styles.container}>
    <div className={styles.chatsWrapper}>
      {conversations && <MyConversations conversations={conversations} currentUser={session?.user} />}
    </div>
  </div>
  )
}

export default Chats;