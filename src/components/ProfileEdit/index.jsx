import React from 'react';
import styles from './ProfileEdit.module.css'

const ProfileEdit = ({user, handleChange, message, handleSubmit}) =>
{
  return (
    <>
      <div className={styles.profile_container}>
        <h2 className={styles.h2}>Персональні дані</h2>
        {user ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.form_container}>
              <div>
                <div className={styles.input_container}>
                  <label htmlFor="">Прізвище:</label>
                  <input className={styles.input} type="text" name="last_name" placeholder="Прізвище" value={user.last_name || ""} onChange={handleChange} />
                </div>
                <div className={styles.input_container}>
                  <label htmlFor="">Ім'я:</label>
                  <input className={styles.input} type="text" name="first_name" placeholder="Ім'я" value={user.first_name || ""} onChange={handleChange} />
                </div>
                <div className={styles.input_container}>
                  <label htmlFor="">По-батькові:</label>
                  <input className={styles.input} type="text" name="patronymic" placeholder="По-батькові" value={user.patronymic || ""} onChange={handleChange} />
                </div>
                <div className={styles.input_container}>
                  <div>Стать:</div>
                  <select className={styles.select} name="gender"  onChange={handleChange}>
                    <option value="female" selected={user.gender == 'female'}>Жіноча</option>
                    <option value="male" selected={user.gender == 'male'}>Чоловіча</option>
                  </select>
                </div>
              </div>

              <div>
                <div className={styles.input_container}>
                  <label htmlFor="">Телефон:</label>
                  <input className={styles.input} type="text" name="phone" placeholder="" value={user.phone || ""} onChange={handleChange} />
                </div>
                <div className={styles.input_container}>
                  <label htmlFor="">День народження:</label>
                  <input className={styles.input} type="date" name="birthday" value={user.birthday.split(' ')[0] || ""} onChange={handleChange} />
                </div>
                <div className={styles.input_container}>
                  <label htmlFor="">e-mail:</label>
                  <input className={styles.input} type="email" name="email" placeholder="E-mail" value={user.email || ""} onChange={handleChange} disabled />
                </div>
                <div className={styles.input_container}>
                  <label htmlFor="">Місто:</label>
                  <input className={styles.input} type="text" name="city" placeholder="Місто" value={user.city || ""} onChange={handleChange} />
                </div>
              </div>
            </div>
            
    
            <button className={styles.button} type="submit" onClick={handleSubmit}>Зберегти</button>
            <div>{message}</div>
          </form>
        ) : (
          <p>Завантаження профілю...</p>
        )}
      </div>
    </>
  );
}

export default ProfileEdit;
