import React, { useContext, useEffect, useId, useState } from 'react';
import styles from "./EventsList.module.css"
import { EventsContext, SelectedDateContext } from '../../context';

const EventsList = (props) => {

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
      <div className={styles.events__container}>
      {/* Нова подія */}
        <div className={styles.container__new_event}>
          <div >New event</div> 
          {/* onKeyDown - якщо натиснута клавіша, то запустити функцію handleAddEventKeyDown */}
          {/* Якщо натиснута Enter, то додати подію у список */}
          <input id={inputEventTextId} type="text" placeholder='Enter new event' onKeyDown={handleAddEventKeyDown}/>
          <button className={styles.button__add} onClick={handleAddEventClick} >Add</button>
        </div>

        <div>
          <h4>Events for the selected day</h4>
        </div>

        <div className={styles.events__container_list}>
          {events.map((event) => {
          return (
            <>
            <div className={styles.event__container} key={event.id}>
              <div className={styles.event__container_flex}>
                <img className={styles.img} src="./img/Task.png" alt="" />
                <input id={event.id} type="text" defaultValue={event.body} readOnly={true} className={styles.input_readonly} onKeyDown={handleEditEventEnter} data-id={event.id}/>
              </div>
              
              <div className={styles.event__container_flex +" " + styles.gap}>
                <img className={styles.event__button_edit} src="./img/Edit.png" alt="" onClick={handleEditEventClick} data-id={event.id}/>
                <img className={styles.event__button} src="./img/Delete.png" alt="" onClick={props.handleDeleteEventClick} data-id={event.id}/>
              </div>
            </div> 
            </>
            )
          })}
        </div>
      </div>    
  );
}

export default EventsList;
