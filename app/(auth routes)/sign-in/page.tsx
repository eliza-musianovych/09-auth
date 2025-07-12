'use client';

import { useRouter } from "next/navigation";
import css from "./SignInPage.module.css";
import { useState } from "react";
import { login } from "@/lib/api/clientApi";
import { LoginRequest } from "@/types/user";
import { useAuthStore } from "@/lib/store/authStore";

const SignIn = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const setUser = useAuthStore((state) => state.setUser);

    const handleSubmit = async (formData: FormData) => {
        try {
            const formValue = Object.fromEntries(formData) as LoginRequest;
        const response = await login(formValue);

        if (response) {
          setUser(response);
            router.push('/profile');
        } else {
            setError('Invalid email or password. Try again.')
        };
    } catch (error) {
        console.log(`Error: ${error}.`)
        setError(`Login failed. Please check your email and password or try again later.`)
    }
    }
    return (
        <main className={css.mainContent}>
 <form className={css.form} action={handleSubmit}>
    <h1 className={css.formTitle}>Sign in</h1>

    <div className={css.formGroup}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" className={css.input} required />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" className={css.input} required />
    </div>

    <div className={css.actions}>
      <button type="submit" className={css.submitButton}>
        Log in
      </button>
    </div>

    {error && <p className={css.error}>{error}</p>}
  </form>
</main>
    )
}

export default SignIn;