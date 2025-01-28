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

  let logo_src = props.localhostFrontend + '/img/logo_header.png';
  let search_src = props.localhostFrontend + '/img/Search.png';
  let profile_src = props.localhostFrontend + '/img/profile.png';
  let cart_src = props.localhostFrontend + '/img/cart.png';

  return (
      <>
        <header className={styles.header}>
          <div className={styles.header_container_flex_search}>
            <div><Link className={styles.logo_header} to="/"><img src={logo_src}/></Link> </div>
            <div>
              <form action="" className={styles.header_form_search}>
                <input id={props.input_search_id} className={styles.header_form_search_input} type="text" placeholder='Пошук' onKeyDown={handlerEnterKeyUpSearch} />
                <img className={styles.header_img_search} src={search_src} alt="" onClick={handlerOnClickSearch}/> 
              </form>
              <div><a href=""></a> </div>
            </div>

            <div className={styles.cart_profile_container}>
              {/* Вхід до кабінету */}
              <div>
                <Link> <img className={styles.img_profile} src={profile_src} alt="" />
                </Link>
              </div>
                
              {/* Кошик */}
              <div className={styles.cart}>
                <Link to='/cart'> <img className={styles.img_cart} src={cart_src} alt="" />
                </Link>
                <div className={cart_classes}>
                  {props.cart_count}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.header_container_flex}>
            <div>
              <DropMenu category_title="Для жінок" type="women" categories={categories} />
            </div>
            <div>
              <DropMenu category_title="Для чоловіків" type="men" categories={categories} />
            </div>
            <div>
              <DropMenu category_title="Для дітей" type="children" categories={categories} />
            </div>
          </div>

          
        </header>
      </>  
  );
}

export default Header;
