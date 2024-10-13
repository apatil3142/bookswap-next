"use client";

import { register } from "@/lib/action";
import styles from "./registerForm.module.css";
import { useFormState } from "react-dom";
import Link from "next/link";
import InputField from "../inputs/inputField/InputField";
import Button from "../inputs/button/Button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined);
  const router = useRouter();

  useEffect(() => {
    if(state?.success){
      router.push('/login');
    }
  },[state?.success, router]);

  return (
    <form className={styles.form} action={formAction}>
      <InputField type="text" placeholder="username" name="username" />
      <InputField type="text" placeholder="email" name="email" />
      <InputField type="password" placeholder="password" name="password" />
      <InputField type="password" placeholder="confirm password" name="confirmPassword" />
      <Button>Register</Button>
      {state?.error && <div className={styles.errorText}>{state?.error}</div>}
        <div className={styles.text}>
        {"Already have an account? "}
          <Link href="/login">
            <b className={styles.registerButton}>Login</b>
          </Link>
        </div>
    </form>
  );
};

export default RegisterForm;