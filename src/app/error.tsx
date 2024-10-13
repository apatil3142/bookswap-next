'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 import styles from './error.module.css';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  const router = useRouter();

  useEffect(() => {
    console.error(error.message)
  }, [error])
 
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Something went wrong!</h2>
      <button
        className={`${styles.button} ${styles.reset}`}
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
      <h3>OR</h3>
      <button onClick={() => router.push('/')} className={`${styles.button} ${styles.homeButton}`}>Go to Home</button>
    </div>
  )
}