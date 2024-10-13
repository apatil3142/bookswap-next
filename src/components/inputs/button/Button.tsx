import styles from './button.module.css';

type IButtonPropType =  React.ButtonHTMLAttributes<HTMLButtonElement>;
const Button = ({children, ...props}: IButtonPropType) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  )
}

export default Button;
