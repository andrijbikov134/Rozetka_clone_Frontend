import React, { useState } from 'react';
import styles from './NewAdministrator.module.css';
import { useNavigate } from 'react-router-dom';

  const NewAdminstrator = ({localhost}) =>
  {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState({last_name: '',
    first_name: '',
    last_name: '',
    password: '',
    patronymic: '',
    gender: 'male',
    phone: '',
    birthday: '',
    email: '',
    city: ''
  });

  const handleChange = (e) =>
  {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleOnClickCancel = () =>
  {
    navigate(-1);
  }

  const validation = () =>
  {
    let result = true;

    if(user.email == '')
    {
      setErrorMessage('Помилка введення даних');
      let input = document.querySelector(`input[name="email"]`);
      input.classList.add(styles.error);      
      result = false;
    }
    else
    {
      setErrorMessage('');
      let input = document.querySelector(`input[name="email"]`);
      input.classList.remove(styles.error); 
      result = true;   
    }

    if(user.password == '')
    {
      setErrorMessage('Помилка введення даних');
      let input = document.querySelector(`input[name="password"]`);
      input.classList.add(styles.error);      
      result = false;
    }
    else
    {
      setErrorMessage('');
      let input = document.querySelector(`input[name="password"]`);
      input.classList.remove(styles.error); 
      result = true;   
    }

    if(user.first_name == '')
    {
      setErrorMessage('Помилка введення даних');
      let input = document.querySelector(`input[name="first_name"]`);
      input.classList.add(styles.error);      
      result = false;
    }
    else
    {
      setErrorMessage('');
      let input = document.querySelector(`input[name="first_name"]`);
      input.classList.remove(styles.error);      
      result = true;   
    }
    return result;
  }

  const handleSubmitAddNewAdmin = (event) =>
  {
    event.preventDefault();
    
    if(validation())
    {
      let url;
      let action = 'addNewAdministrator';
      url = `${localhost}/index.php?action=${action}`;
      fetch(url, {
        method: 'POST',
        header: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(user)
      })
      .then(response =>
        navigate(-1)        
        )
    }
  };

  return (
    <>
      <div className={styles.profile_container}>
        <h2 className={styles.h2}>Новий адміністратор</h2>
        {
          <form onSubmit={handleSubmitAddNewAdmin} className={styles.form}>
            <div className={styles.form_container}>
              <div className={styles.form_column}>
                <div className={styles.input_container}>
                  <label htmlFor="">Ім'я: *</label>
                  <input className={styles.input} type="text" name="first_name" placeholder="Ім'я" value={user.first_name} onChange={handleChange} />
                </div>
                <div className={styles.input_container}>
                    <label htmlFor="">e-mail: *</label>
                    <input className={styles.input} type="email" name="email" placeholder="e-mail" value={user.email } onChange={handleChange}/>
                </div>
                <div className={styles.input_container}>
                    <label htmlFor="">Пароль: *</label>
                    <input className={styles.input} type="text" name="password" placeholder="Пароль" value={user.password} onChange={handleChange}/>
                </div>
                <div className={styles.input_container}>
                  <label htmlFor="">Прізвище:</label>
                  <input className={styles.input} type="text" name="last_name" placeholder="Прізвище" value={user.last_name} onChange={handleChange} />
                </div>
                <div className={styles.input_container}>
                  <div>Стать:</div>
                  <select className={styles.select} name="gender"  onChange={handleChange}>
                    <option value="female" selected={user.gender == 'female'}>Жіноча</option>
                    <option value="male" selected={user.gender == 'male'}>Чоловіча</option>
                  </select>
                </div>
                <div className={styles.form_column_mobile}>
                  <div className={styles.input_container}>
                    <label htmlFor="">По-батькові:</label>
                    <input className={styles.input} type="text" name="patronymic" placeholder="По-батькові" value={user.patronymic} onChange={handleChange} />
                  </div>
                  <div className={styles.input_container}>
                    <label htmlFor="">Телефон:</label>
                    <input className={styles.input} type="text" name="phone" placeholder="" value={user.phone || ""} onChange={handleChange} />
                  </div>
                  <div className={styles.input_container}>
                    <label htmlFor="">День народження:</label>
                    <input className={styles.input} type="date" name="birthday" value={user.birthday == null ? '' : user.birthday.split(' ')[0]} onChange={handleChange} />
                  </div>
                  
                  <div className={styles.input_container}>
                    <label htmlFor="">Місто:</label>
                    <input className={styles.input} type="text" name="city" placeholder="Місто" value={user.city || ""} onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className={styles.form_column_second}>
                <div className={styles.input_container}>
                    <label htmlFor="">По-батькові:</label>
                    <input className={styles.input} type="text" name="patronymic" placeholder="По-батькові" value={user.patronymic} onChange={handleChange} />
                </div>
                <div className={styles.input_container}>
                  <label htmlFor="">Телефон:</label>
                  <input className={styles.input} type="text" name="phone" placeholder="" value={user.phone || ""} onChange={handleChange} />
                </div>
                <div className={styles.input_container}>
                  <label htmlFor="">День народження:</label>
                  <input className={styles.input} type="date" name="birthday" value={user.birthday == null ? '' : user.birthday.split(' ')[0]} onChange={handleChange} />
                </div>
                <div className={styles.input_container}>
                  <label htmlFor="">Місто:</label>
                  <input className={styles.input} type="text" name="city" placeholder="Місто" value={user.city || ""} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div>
              * - обов'язові поля
            </div>
            <div>{errorMessage}</div>
            <div>
              <button className={styles.button_cancel} onClick={handleOnClickCancel}>Скасувати</button>
              <button className={styles.button_save} type="submit" onClick={handleSubmitAddNewAdmin}>Зберегти</button>
            </div>
          </form>
        }
      </div>
    </>
  );
}

export default NewAdminstrator;
