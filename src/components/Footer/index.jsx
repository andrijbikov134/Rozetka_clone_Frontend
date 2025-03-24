import React, { useContext, useEffect, useId, useState } from 'react';
import styles from "./Footer.module.css"
import { Link, useNavigate } from 'react-router-dom';

const Footer = (props) => {

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();

  // Функція, яка спрацьовує під час натискання кнопки "Add"
  const handleAddEventClick = () => 
  {
    props.handleAddEventClick(inputEventTextId)
  }

  // Функція натискання клавіш у полі введення тексту нової події
  const handleAddEventKeyDown = (event) => 
  {
    if(event.key === "Enter")
    {
      handleAddEventClick();
    }
  }

  // Функція натискання на малюнок редагування події
  const handleEditEventClick = (event) => 
  {
    props.editEvent(event.target);
  }

  // Функція натискання на Enter в полі введення події, яка редагується
  const handleEditEventEnter = (event) => 
  {
    let target = event.target;
    if(event.key === "Enter" && !target.classList.contains(styles.input_readonly))
    {
      // Отримуємо картинку редагування
      target = target.closest(`.${styles.event__container}`).getElementsByClassName(styles.event__button_edit)[0];
      // Відправити в функцію редагування події
      props.editEvent(target);
    }
  }
  
  const handlerOnClickRegister = () =>
  {
    navigate('/register');
  }

  // Хук - згенерувати Id для кожної події
  const inputEventTextId = useId();

  return (
      <>
        <footer className={styles.footer}>
          {
            props.user == 0 ?
            <div className={styles.footer_container_register}>
            <div><span className={styles.footer_register_title}>Зареєструйтеся,</span><br/>щоб відстежувати історію замовлень</div>
            <button className={styles.buton_register} onClick={handlerOnClickRegister}>ЗАРЕЄСТРУВАТИСЯ</button>
          </div> 
            : <></>
          }
          

          <div className={styles.footer_container_flex}>
            <div className={styles.footer_container_column}>
              <div>КОНТАКТИ</div>
              <div><Link to="/contacts">Про нас</Link> </div>
              <div><Link to="/shops">Наші магазини</Link> </div>
              <div>+38-067-123-45-67</div>
            </div>

            <div className={styles.footer_container_column}>
              <div>ДОПОМОГА КЛІЄНТУ</div>
              <div><Link className={styles.link} to="/sizes">Таблиця розмірів</Link> </div>
              <div><Link to="/questionsandanswers">Питання та відповіді</Link></div>
              <div><Link to="/delivery">Доставка</Link> </div>
            </div>

            <div className={styles.footer_container_column}>
              <div>СЕРВІСИ</div>
              <div><Link to="/paymentmethods">Способи оплати</Link> </div>
              {/* <div><Link to="/giftcertificates">Подарункові сертифікати</Link> </div> */}
            </div>
          </div>
          <div><Link className={styles.logo} to="/"><img src= {props.localhostFrontend + "/img/logo_footer.png"}/></Link> </div>
          <div className={styles.footer_year}>Copyright © 2022-2025</div>
        </footer>
      </>  
  );
}

export default Footer;
