import LoginForm from '@/components/loginForm/LoginForm';
import styles from './login.module.css';

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.leftBox}>
          <div className={styles.header}>Welcome Back!</div>
          <div className={styles.para}>
          Dive into a world where second-hand books find new homes and stories continue to inspire. Join us in our mission to make the joy of reading accessible to all, one book at a time. Happy swapping!
          </div>
        </div>
        <div className={styles.rightBox}>
          <div className={`${styles.header} ${styles.formHeader}`}>Sign In</div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Login;