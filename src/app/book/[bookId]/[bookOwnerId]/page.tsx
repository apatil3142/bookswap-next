import Image from 'next/image';
import styles from './bookDetails.module.css';
import UserChats from '@/components/UserChats/UserChats';
import { auth } from '@/lib/auth';

const getBookDetails = async (bookId) => {
  const response = await fetch(`http://localhost:3000/api/books/${bookId}`);
  const data = await response.json();
  return data;
}

const BookDetails = async ({params}) => {
  const {bookId, bookOwnerId} = params;
  const bookDetails = await getBookDetails(bookId);

  const session = await auth();

  return (
    <div className={styles.container}>
      <div className={styles.bookDetailsContainer}>
        <div className={styles.bookInfo}>
          <div className={styles.bookImageContainer}>
            {/* Image */}
            <Image className={styles.bookImage} src={bookDetails.image} alt={bookDetails.title} fill />
          </div>
          <div className={styles.bookInformation}>
            <div className={styles.infoDiv}>
              <div className={styles.subTitle}>Title</div>
              <div className={styles.title}>{bookDetails.title}</div>
            </div>
            <div className={styles.infoDiv}>
              <div className={styles.subTitle}>Abbreviation</div>
              <div className={styles.title}>{bookDetails.abbreviation}</div>
            </div>
            <div className={styles.infoDiv}>
              <div className={styles.subTitle}>Amount</div>
              <div className={styles.title}>{bookDetails.amount}</div>
            </div>
            <div className={styles.infoDiv}>
              <div className={styles.subTitle}>City</div>
              <div className={styles.title}>{bookDetails.city}</div>
            </div>
          </div>
        </div>
        <div className={styles.chatInfo}>
          <UserChats name={bookDetails.postedBy.name} session={session} bookOwnerId={bookOwnerId} />
        </div>
      </div>
    </div>
  )
};

export default BookDetails;