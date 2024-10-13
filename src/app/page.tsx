import Bookcard from "@/components/bookcard/Bookcard";
import styles from "./page.module.css";
import { IBook } from "@/lib/interface";
export const dynamic = 'force-dynamic'

const getBooks = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, {cache: 'no-store'});
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
