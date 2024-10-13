import Bookcard from "@/components/bookcard/Bookcard";
import styles from "./page.module.css";
import { IBook } from "@/lib/interface";

const getBooks = async () => {
  const response = await fetch('http://localhost:3000/api/books', {cache: 'no-cache'});
  const data = await response.json();
  return data;
};

export default async function Home() {
  const booksList: IBook[] = await getBooks();
  return (
    <div className={styles.container}>
      {booksList?.map(book => (
        <Bookcard key={book._id} book={book} />
      ))}
    </div>
  );
}
