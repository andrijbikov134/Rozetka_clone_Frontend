import { useState, useEffect } from "react";
import styles from './ProfilePage.module.css';
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import ProfileEdit from "../ProfileEdit";
import ProfileOrders from "../ProfileOrders";
import ChangePassword from "../ChangePassword";
import ProfileHiddenProducts from '../ProfileHiddenProducts'
import SalesChart from "../SalesStatistic";
import ProfileAllOrders from "../ProfileAllOrders";

const ProfilePage = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user_petrushka_style')) || JSON.parse(sessionStorage.getItem('user_petrushka_style'))); 
  const [message, setMessage] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false); // Для модального вікна  

  // Оновлення полів форми
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateProfile = () =>
  {
    let oldUser = JSON.parse(localStorage.getItem('user_petrushka_style')) || [];
    if(user.length == 0)
    {
      sessionStorage.setItem('user_petrushka_style',JSON.stringify(user));
    }
    else
    {
      localStorage.setItem('user_petrushka_style',JSON.stringify(user));
    }
    props.loadCurrentUser();

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${props.localhost}/index.php?action=updateprofile`,
        user,
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage(response.data.message);
      updateProfile();
    } catch (error) {
      setMessage("Помилка збереження профілю", error);
    }
  };  
  

  return (
    <div className={styles.main_container}>
      <div className={styles.nav_bar_container}>
        <h3 className={styles.h3}>Раді, що Ви з нами, {user.first_name}!</h3>
        {
          user.role == "Administrator" ?
          <>
            <Link to="/profile/edit">Редагувати профіль</Link>
            <Link onClick={() => setShowChangePassword(true)}>Змінити пароль</Link>
            <Link to="/profile/allorders">Усі замовлення</Link>
            <Link to="/profile/statistic">Статистика продажів</Link>
            <Link to="/profile/hiddenproducts">Приховані товари</Link>
            <Link to="/profile/addadmin">Додати адміністратора</Link>
          </> 
          :
          <>
            <Link to="/profile/edit">Редагувати профіль</Link>
        
            <Link onClick={() => setShowChangePassword(true)}>Змінити пароль</Link>
      
            <Link to="/profile/orders">Мої замовлення</Link>
          </>
        }
        
        {/* <hr className={styles.hr}/> */}
        
        <div className={styles.exit_container}>
          
          <Link  className={styles.exit_button} to='/logout'><img className={styles.img_exit} src={props.localhostFrontend + '/img/exit.png'}  alt="" /> Вийти з кабінету</Link>
        </div>
      </div>
      <Routes>
        <Route path='/edit' element={<ProfileEdit user={user} handleChange={handleChange} handleSubmit={handleSubmit}/>}/>
        <Route path='/orders' element={<ProfileOrders localhost={props.localhost} user_id={user.id}/>}/>
        <Route path='/hiddenproducts' element={<ProfileHiddenProducts localhost={props.localhost} user_id={user.id} googleBucketUrl={props.googleBucketUrl}/>}/>
        <Route path='/statistic' element={<SalesChart localhost={props.localhost}/>}/>
        <Route path='/allorders' element={<ProfileAllOrders localhost={props.localhost}/>}/>


        {/* <Route path='/changepassword' element={<ChangePassword userId={user.id} closeModal={() => setShowChangePassword(false)} />}/> */}

      </Routes>
      {/* Модальне вікно зміни пароля */}
      {showChangePassword && (
        <ChangePassword userId={user.id} closeModal={() => setShowChangePassword(false)} localhost={props.localhost}/>
      )}
    </div>
  );
  
};

export default ProfilePage;

