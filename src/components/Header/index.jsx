import React, { useContext, useEffect, useId, useState } from 'react';
import styles from "./Header.module.css"
import { Link } from 'react-router-dom';

const Header = (props) => {


  // Функція, яка спрацьовує під час натискання кнопки "Add"
  const handleAddEventClick = () => 
  {
    props.handleAddEventClick(inputEventTextId)
  }

 


  
  // Хук - згенерувати Id для кожної події
  const inputEventTextId = useId();

  return (
      <>
        <header className={styles.header}>
          <div className={styles.header_container_flex}>
            <div><Link className={styles.logo} to="/"><img src="./img/logo.png"/></Link> </div>
            <div><Link to="/">PETRUSHKA STYLE</Link> </div>
            <div><a href="">Для жінок</a> </div>
            <div><a href="">Для чоловіків</a> </div>
            <div><a href="">Для дітей</a> </div>
            <div>
              <form action="" className={styles.header_form_search}>
                <img className={styles.header_img_search} src="./img/Search.png" alt="" />
                <input className={styles.header_form_search_input} type="text"/>
                <input type="submit" value="Знайти" />
                {/* <div className={styles.header_img_input_container}>
                  
                </div> */}
  
              </form>
              <div><a href=""></a> </div>
            </div>
            <div><a href="">Кабінет</a> </div>
            <div className={styles.cart}><a href="">Кошик</a> </div>

          </div>
        </header>
      </>  
  );
}

export default Header;
