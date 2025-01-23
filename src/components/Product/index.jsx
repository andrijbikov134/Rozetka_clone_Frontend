import React, { useContext, useEffect, useId, useState } from 'react';
import styles from "./Product.module.css"
import { EventsContext, SelectedDateContext } from '../../context';

const Product = (props) => {

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
        <div className={styles.container_column}>
          <img className={styles.img} src={props.img} alt="" />
          <div >{[props.title]}</div>
          <div className={styles.container_products}>{props.price} грн.</div>
        </div>
      </>
  );
}

export default Product;
