import React, { useContext, useId} from 'react';
import styles from "./Header.module.css"
import { Link } from 'react-router-dom';
import DropMenu from '../DropdownMenu';

const Header = (props) =>
{
  const handlerEnterKeyUpSearch = (event) =>
  {
    if(event.key == "Enter")
    {
      event.preventDefault();
      props.handlerSearchProducts(event.target.value);
    }
  }

  const handlerOnClickSearch = (event) =>
  {
    let input = document.getElementById(props.input_search_id);
    props.handlerSearchProducts(input.value);
  }

  let cart_classes;
  cart_classes = props.cart_count > 0 ? `${styles.count_cart}` : `${styles.count_cart} ${styles.hidden}`;
  
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

  return (
      <>
        <header className={styles.header}>
          <div className={styles.header_container_flex}>
            <div><Link className={styles.logo} to="/"><img src="./img/logo.png"/></Link> </div>
            <div><Link to="/" className={styles.logo_title}>PETRUSHKA STYLE</Link> </div>
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
                <input id={props.input_search_id} className={styles.header_form_search_input} type="text" placeholder='Шукаю' onKeyDown={handlerEnterKeyUpSearch} />
                <img className={styles.header_img_search} src="./img/Search.png" alt="" onClick={handlerOnClickSearch}/> 
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
              
              <Link to='/cart'> <img className={styles.img_cart} src={"./img/cart.png"} alt="" />
              </Link>
              
              <div className={cart_classes}>
                {props.cart_count}
              </div>
            </div>

          </div>
        </header>
      </>  
  );
}

export default Header;
