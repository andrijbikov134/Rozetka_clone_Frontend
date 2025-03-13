import React, { useState } from "react";
import styles from "./ChangePassword.module.css";
import { useNavigate } from "react-router-dom";

const ChangePassword = ({ userId, closeModal, localhost }) =>
{
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async () => {
  if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
    setError("Будь ласка, заповніть всі поля!");
    return;
  }

  if (passwordData.newPassword !== passwordData.confirmPassword) {
    setError("Нові паролі не співпадають!");
    return;
  }

  try
  {
    const API_URL = `${localhost}/index.php?action=change-password`;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,  
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
      })
    });

    const result = await response.json();
    console.log("Відповідь сервера:", result);

    if (result.success) {
      closeModal();  
    } else {
      setError(result.error);
    }
  } catch (error) {
    console.error("Помилка при запиті:", error);
    setError("Сталася помилка під час зміни пароля!");
  }
};


  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <h3 className={styles.h3}>Змінити пароль</h3>
        <div className={styles.error}>{error}</div>
        <input
          type="password"
          name="oldPassword"
          placeholder="Старий пароль"
          value={passwordData.oldPassword}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="password"
          name="newPassword"
          placeholder="Новий пароль"
          value={passwordData.newPassword}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Повторіть пароль"
          value={passwordData.confirmPassword}
          onChange={handleChange}
          className={styles.input}
        />
        <button className={styles.button} onClick={handleSubmit}>
          Зберегти
        </button>
        <button className={styles.cancel_button} onClick={closeModal}>
          Скасувати
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;


