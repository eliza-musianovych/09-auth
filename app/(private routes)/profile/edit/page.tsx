'use client';

import css from './EditeProfilePage.module.css';
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const EditProfile = () => {
    const router = useRouter();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        getMe().then((user) => {
            setUserName(user.userName ?? '');
            setUserEmail(user.email ?? '')
        })
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    };

    const handleSave = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await updateMe({userName});
        router.push('/profile');
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    <Image src="/avatar.jpg"
      alt="User Avatar"
      width={120}
      height={120}
      className={css.avatar}
    />

    <form className={css.profileInfo} onSubmit={handleSave}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username:</label>
        <input id="username"
          type="text"
          value={userName}
          className={css.input}
          onChange={handleChange}
        />
      </div>

      <p>Email: {userEmail}</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  </div>
</main>
    )
};

export default EditProfile;