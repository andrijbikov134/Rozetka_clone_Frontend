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
              <div><a href="">КОНТАКТИ</a> </div>
              <div><a href="">Наші магазини</a> </div>
              <div><a href="">+38-067-123-45-67</a> </div>
            </div>

            <div className={styles.footer_container_column}>
              <div><a href="">КОМПАНІЯ</a> </div>
              <div><a href="">Про нас</a> </div>
            </div>
            <div className={styles.footer_container_column}>
              <div><a href="">СЕРВІСИ</a> </div>
              <div><a href="">Оплата і доставка</a> </div>
              <div><a href="">Подарункові сертифікати</a> </div>
              <div><a href="">Таблиця розмірів</a> </div>
              <div><Link to="/feedback">Залишити відгук</Link> </div>
            </div>
          </div>
          <hr />
          <div className={styles.footer_year}>2025 Інтернет-магазин "Petrushka-style"</div>
        </footer>
      </>  
  );
}

export default Footer;
