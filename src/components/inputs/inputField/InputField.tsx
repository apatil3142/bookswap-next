import React from 'react'
import styles from './inputField.module.css';

interface IInputFieldProps{
  label?: string;
}

type InputFieldTypes = IInputFieldProps & React.InputHTMLAttributes<HTMLInputElement>;

const InputField: React.FC<InputFieldTypes> = ({label, ...props}) => {
  return (
    <div className={styles.container}>
    {label && <label className={styles.label}>{label}</label>}
    <input
      className={styles.inputField}
      {...props}
    />
  </div>
  )
}

export default InputField