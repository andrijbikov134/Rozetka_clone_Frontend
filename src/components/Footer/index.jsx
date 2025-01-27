import React, { useContext, useEffect, useId, useState } from 'react';
import styles from "./Footer.module.css"
import { EventsContext, SelectedDateContext } from '../../context';
import { Link } from 'react-router-dom';

const Footer = (props) => {

  // Властивість, яка зберігає список подій / Зчитати список подій з глобальної властивості
  const events = useContext(EventsContext);
  // Властивість, яка зберігає поточну обрану дату
  const selectedDate = useContext(SelectedDateContext);

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
  
  // Хук - згенерувати Id для кожної події
  const inputEventTextId = useId();

  return (
      <>
        <footer className={styles.footer}>
          <div className={styles.footer_container_flex}>
            <div className={styles.footer_container_column}>
              <div>КОНТАКТИ</div>
              {/* <div><Link to="/contacts" className={styles.about_us}>Про нас</Link> </div> */}
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
              <div><Link to="/giftcertificates">Подарункові сертифікати</Link> </div>
            </div>
          </div>
          <hr />
          <div className={styles.footer_year}>2025 Інтернет-магазин "Petrushka-style"</div>
        </footer>
      </>  
  );
}

export default Footer;
