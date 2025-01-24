import React, { useContext, useEffect, useId, useState } from 'react';
import styles from "./Header.module.css"
import { Link } from 'react-router-dom';
import DropMenu from '../DropdownMenu';

const Header = (props) =>
{
  // Функція, яка спрацьовує під час натискання кнопки "Add"
  const handleAddEventClick = () => 
  {
    props.handleAddEventClick(inputEventTextId)
  }

  const handlerEnterKeyUp = (event) =>
  {
    if(event.key == "Enter")
    {
      props.handlerSearchProducts(event.target.value);
    }
  }

  let categories = [
    {
      type: "clothes",
      title: 'Одяг'
    },
    {
      type: "shoes",
      title: 'Взуття'
    }
    ,
    {
      type: "accessories",
      title: 'Аксесуари'
    }
  ];
  
  // Хук - згенерувати Id для кожної події
  const inputEventTextId = useId();

  return (
      <>
        <header className={styles.header}>
          <div className={styles.header_container_flex}>
            <div><Link className={styles.logo} to="/"><img src="./img/logo.png"/></Link> </div>
            <div><Link to="/">PETRUSHKA STYLE</Link> </div>
            <div>
              <DropMenu category_title="Для жінок" type="women" categories={categories} />
            </div>
            <div>
              <DropMenu category_title="Для чоловіків" type="men" categories={categories} />
            </div>
            <div>
              <DropMenu category_title="Для дітей" type="children" categories={categories} />
            </div>
            <div>
              <form action="" className={styles.header_form_search}>
                <input className={styles.header_form_search_input} type="text" placeholder='Шукаю' onKeyUp={handlerEnterKeyUp}/>
                {/* <img className={styles.header_img_search} src="./img/Search.png" alt="" /> onClick={props.handlerSearchProducts} */}
                {/* <input className={styles.header_form_search_btn} type="submit" value="Знайти" /> */}
              </form>
              <div><a href=""></a> </div>
            </div>

            {/* Вхід до кабінету */}
            <div>
              <Link> <img className={styles.img_profile} src={"./img/profile.png"} alt="" />
              </Link>
            </div>
              
            {/* Кошик */}
            <div className={styles.cart}>
              
              <Link> <img className={styles.img_cart} src={"./img/cart.png"} alt="" />
              </Link>
              
            </div>

          </div>
        </header>
      </>  
  );
}

export default Header;
