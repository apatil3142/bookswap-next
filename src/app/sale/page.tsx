"use client"
import InputField from '@/components/inputs/inputField/InputField';
import styles from './sale.module.css';
import Button from '@/components/inputs/button/Button';
import { useCallback, useState } from 'react';
import FileDragAndDrop from '@/components/fileDragAndDrop/FileDragAndDrop';
import { useRouter } from 'next/navigation';
import { addNewBook } from '@/lib/action';
import { revalidatePath } from 'next/cache';

interface IBookDetailType {
  title: string;
  abbreviation: string;
  amount: number;
  city: string;
}

export interface IAddNewBookPayload {
  title: string, 
  abbreviation: string, 
  amount: number, 
  city: string, 
  image: string, 
  cloudinaryId: string
}

const Sale = () => {
  const [imageFile, setImageFile] = useState<string>('');
  const [bookDetails, setBookDetails] = useState<IBookDetailType>({title: '', abbreviation: '', amount: 0, city: ''});
  const router = useRouter();

  const onFileSelected = useCallback((file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if(event.target){
          setImageFile(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  },[]);

  const handleAddBook = useCallback(async(e) => {
    e.preventDefault();
    if(!imageFile){
      console.log('Please select Image File')
      return;
    }

    const payload: IAddNewBookPayload = {
      title: bookDetails.title,
      abbreviation: bookDetails.abbreviation,
      city: bookDetails.city,
      amount: bookDetails.amount,
      cloudinaryId: '', 
      image: ''
    }

    const status = await addNewBook({imageFile, payload: {...payload}});
    if(status?.success){
      revalidatePath('/');
      router.push('/');
    }
  }, [imageFile, bookDetails, router]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          {imageFile ? <img className={styles.selectedImg} src={imageFile} /> : <FileDragAndDrop onFileSelected={onFileSelected} />}
        </div>
        <form className={styles.bookDetailsWrapper}>
          <InputField label="Title" value={bookDetails.title} onChange={(e) => setBookDetails(prev => ({...prev, title: e.target.value}))} />
          <InputField label="Abbrevation" value={bookDetails.abbreviation} onChange={(e) => setBookDetails(prev => ({...prev, abbreviation: e.target.value}))} />
          <InputField type="number" label="Amount" value={bookDetails.amount} onChange={(e) => setBookDetails(prev => ({...prev, amount: parseInt(e.target.value)}))} />
          <InputField label="City" value={bookDetails.city} onChange={(e) => setBookDetails(prev => ({...prev, city: e.target.value}))} />
          <Button onClick={handleAddBook}>Submit</Button>
        </form>
      </div>
    </div>
  )
};

export default Sale;