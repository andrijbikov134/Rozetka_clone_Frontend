import { useState, useEffect} from 'react';
import styles from "./Header.module.css"
import { Link, useNavigate } from 'react-router-dom';
import DropdownMenu from '../DropdownMenu';
import DropdownMenuLogin from '../DropdownMenuLogin';

const Header = (props) =>
{
  const navigate = useNavigate();
  const [categoriesSub, setCategoriesSub] = useState([]);
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

  const loadCategoriesSub = () =>
  {
    let url = `${props.localhost}/index.php?action=getCategoriesSub`;
      fetch(url, {
        method: 'POST',
        header: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({action: 1})
      })
      .then(response =>
        response.json()
        )
      .then(response => {
        setCategoriesSub(response);
      })
  }

  const handlerOnClickProfile = () =>
  {
    if(props.user == 0)
    {
      navigate('/login');
    }
  }

  const handlerOnClikCart = () =>
  {
    navigate('/cart');
  }

  useEffect(() => {
    loadCategoriesSub();
  }, []);

  let cart_classes;
  cart_classes = props.cart_count > 0 ? `${styles.count_cart}` : `${styles.count_cart} ${styles.hidden}`;
  
  let categoriesProfileClient = [
    {
      type: "profile",
      title: 'Персональні дані'
    },
    {
      type: "orders",
      title: 'Мої замовлення'
    },
    {
      type: "logout",
      title: 'Вийти'
    }
  ];

  let categoriesProfileAdmin = [
    {
      type: "allorders",
      title: 'Усі замовлення'
    },
    {
      type: "statisticssale",
      title: 'Статистика продажів'
    },
    {
      type: "addadmin",
      title: 'Додати адміністратора'
    },
    {
      type: "logout",
      title: 'Вийти'
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
              <div className={styles.profile}>
                <div>
                  {props.user == 0 ? "" : props.user.first_name}
                </div>
                {
                (props.user.role == "Administrator" ? 
                <DropdownMenuLogin src={profile_src} categories={categoriesProfileAdmin} user={props.user} handlerOnClickProfile={handlerOnClickProfile}/>
                : 
                <DropdownMenuLogin src={profile_src} categories={categoriesProfileClient} user={props.user} handlerOnClickProfile={handlerOnClickProfile}/>)
                }
              </div>
                
              {/* Кошик */}
              <div className={styles.cart}>
                <Link to='/cart'> <img className={styles.img_cart} src={cart_src} alt="" />
                </Link>
                <div className={styles.count_cart} onClick={handlerOnClikCart}>
                  {props.cart_count}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.header_container_flex}>
            <div>
              <DropdownMenu category_title="Для жінок" type="women" categories={categoriesSub} />
            </div>
            <div>
              <DropdownMenu category_title="Для чоловіків" type="men" categories={categoriesSub} />
            </div>
            <div>
              <DropdownMenu category_title="Для дітей" type="children" categories={categoriesSub} />
            </div>
          </div>

          
        </header>
      </>  
  );
}

export default Header;
