import {useState, useEffect, useId} from 'react';
import styles from './UserManagement.module.css'
import { useNavigate } from 'react-router-dom';

const UserManagement = ({localhost, localhostFrontend}) => {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState('');
  const tableId = useId();

  // const fetchData = (role) =>
  // {
  //   let url = `${localhost}/index.php?action=getUsersByRole&role=${role}`;
  //   fetch(url, {
  //     method: 'GET',
  //     header: {
  //       'Content-Type': 'application/json', 
  //     },
  //   })
  //   .then(response =>
  //     response.json()
  //     )
  //   .then(response => {
  //      setUsers(response);
  //   })
  // }

  const fetchData = (action) =>
  {
    let url = `${localhost}/index.php?action=${action}`;
    fetch(url, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json', 
      },
    })
    .then(response =>
      response.json()
      )
    .then(response => {
        setUsers(response);
    })
  }

  const handlerOnClickEdit = (event) =>
  {
    let row = event.currentTarget.closest('tr');
    let password = row.getElementsByClassName(styles.password)[0];
    password.disabled = !password.disabled;
    password.value = '';
  }

  const handlerOnClickSave = (event) =>
  {
    let row = event.currentTarget.closest('tr');
    let password = row.getElementsByClassName(styles.password)[0];
    let newPassword = password.value;
    
    if(newPassword != '')
    {
      let formData = {id: row.id, password: newPassword};
      let url = `${localhost}/index.php?action=setNewPasswordUser`;
      fetch(url, {
        method: 'POST',
        header: {
          'Content-Type': 'application/json', 
        },
        body : JSON.stringify(formData)
      })
      .then(response =>
        password.disabled = true
        )
    }

  }

  const handlerOnClickNewAdmin = () =>
  {
    navigate('/profile/newadmin');
  }

  useEffect(() => {
    // fetchData('Administrator');
    fetchData('getUsersAdmins');
    setTitle('Адміністратори');
    return () => {
      
    };
  }, []);

  return (
    <>
    
      <div className={styles.main_container}>
        <div className={styles.buttons_container}>
          <button onClick={() => {fetchData("getUsersAdmins"); setTitle('Адміністратори');}} className="btn">Адміністратори</button>
          <button onClick={() => {fetchData("getUsersClients"); setTitle('Клієнти');}} className="btn">Клієнти</button>
        </div>
        <h2>{title}</h2>
        {title == 'Адміністратори' ? 
        <div className={styles.button_add_new_product} onClick={handlerOnClickNewAdmin}>
          Додати
        </div> : <></>}
        <table className={styles.users_container} id={tableId}>
          <thead>
            <tr>
              <th>Прізвище</th>
              <th>Ім'я</th>
              <th>По-батькові</th>
              <th>Стать</th>
              <th>Телефон</th>
              <th>e-mail</th>
              <th>Дата народження</th>
              <th>Місто</th>
              <th>Новий пароль</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {
            users.map((user) =>
            {
              return(
                <tr id={user.id}>
                  <td>{user.last_name}</td>
                  <td>{user.first_name}</td>
                  <td>{user.patronymic}</td>
                  <td>{user.gender == 'male' ? 'Чоловіча' : user.gender == 'female' ? 'Жіноча' : ''}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.birthday ? new Date(user.birthday).toLocaleDateString() : ''}</td>
                  <td>{user.city}</td>
                  <td ><input className={styles.password} disabled type="text" /></td>
                  <td>
                    <img className={styles.img} onClick={handlerOnClickEdit} src={localhostFrontend + '/img/edit.png'}/>
                  </td>
                  <td>
                    <img className={styles.img} onClick={handlerOnClickSave} src={localhostFrontend + '/img/OK.png'}/>
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>   
      </div>
    </>
  );
}

export default UserManagement;
