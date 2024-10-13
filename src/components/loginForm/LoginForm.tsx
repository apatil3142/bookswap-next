"use client";

import { login } from "@/lib/action";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import Link from "next/link";
import InputField from "../inputs/inputField/InputField";
import Button from "../inputs/button/Button";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <form className={styles.form} action={formAction}>
      <InputField type="text" placeholder="username" name="username" />
      <InputField type="password" placeholder="password" name="password" />
      <Button>Login</Button>
      {state?.error}
        <div className={styles.text}>
        {"Don't have an account? "}
          <Link href="/register">
            <b className={styles.registerButton}>Register</b>
          </Link>
        </div>
    </form>
  );
};

export default LoginForm;