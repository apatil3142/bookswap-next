import { IBook } from "@/lib/interface";
import styles from './bookcard.module.css';
import Image from "next/image";
import { getTimeSince } from "@/lib/utils";
import Link from "next/link";

interface IBookCardProps {
  book: IBook;
}

const Bookcard = ({book}: IBookCardProps) => {
  return (
    <Link href={`/book/${book._id}/${book.postedBy._id}`}>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          {book.image.includes('cloudinary') && <Image className={styles.bookImage} src={book.image} alt="BookImage" fill />}
        </div>
        <div className={styles.bookInfoContainer}>
          <div className={styles.title}>{book.title}</div>
          <div className={styles.bookInfo}>₹ {book.amount} | {book.postedBy.name} | {getTimeSince(book.createdAt)}</div>
        </div>
      </div>
    </Link>
  )
};

export default Bookcard;