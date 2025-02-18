import React, {  useEffect, useId, useState } from 'react';
import styles from "./ProductFull.module.css"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Review from '../Review';

const ProductFull = (props) => {
  let location = useLocation();
  let navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user_petrushka_style')));
  
  const [isFeedbackErrorVisible, setIsFeedbackErrorVisible] = useState(false);

  const [sizeErrorActive, setSizeErrorActive] = useState(false);

  const [productId, setProductId] = useState(location.pathname.split('/').pop());

  const [characteristics, setCharacteristics] = useState([]);

  const [sizes, setSizes] = useState([]);

  const [currentSize, setCurrentSize] = useState([]);

  const [product, setProduct] = useState([]);

  const [reviews, setReviews] = useState([]);

  const handlerOnClickAddToCart = () =>
  {
    if(currentSize.length != 0)
    {
      props.handlerOnClickAddToCart(product, currentSize, characteristics.color);
    }
    else
    {
      setSizeErrorActive(true);
    }
  }

  const handlerOnClickFeedback = () =>
  {
    let url = `${props.localhost}/index.php?action=getissaleproductsbyuser&product_id=${productId}&user_id=${user.id}`;
    
    fetch(url, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json', 
      },
    })
    .then(response =>
      response.json()
      )
    .then(response => {
        setIsFeedbackErrorVisible(response === 'true' ? false : true);
        if(response == 'true')
        {
          navigate('/feedback/' + productId);
        }
    })

  }

  const handlerOnClickSize = (event) =>
  {
    let size = 
    {
      id: event.target.dataset.sizeId,
      title: event.target.dataset.sizeTitle
    };
    setCurrentSize(size);
    setSizeErrorActive(false);
  }

  const loadCharacteristics = () =>
  {
    let url;
    let action = 'getProductCharacteristics';
    url = `${props.localhost}/index.php?action=${action}&id=${productId}`;
    
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
        setCharacteristics(response);
    })
  }

  const loadSizes = () =>
  {
    let url;
    let action = 'getProductSizes';
    url = `${props.localhost}/index.php?action=${action}&productId=${productId}`;
    
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
        setSizes(response);
    })
  }

  const loadReviews = () =>
  {
    let url = `${props.localhost}/index.php?action=getReviewsProductById&id=${productId}`;
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
        setReviews(response);
    })
  }

  const loadProductFromDB = () =>
  {
    let url = `${props.localhost}/index.php?action=getProductById&id=${productId}`;
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
        setProduct(response[0]);
        
    })
  }

  const handlerOnClickSizeChart = () =>
  {
    navigate('/sizes');
  }

  useEffect(() => {
    loadProductFromDB();
    loadCharacteristics();
    loadSizes();
    loadReviews();
  }, [productId]);

  useEffect(() => {
  }, [product]);


  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.product_container}>
          <img className={styles.img} src={props.localhostFrontend + "/" + product.pictures_path} alt="" />
          <div className={styles.container_column}>
            <div className={styles.title}>{[product.title]}</div>
            <div>
              <div className={styles.purt_number}>Артикул: {[product.part_number]}</div>
            </div>
            
            <img className={styles.img_sale_product} src={props.localhostFrontend + "/img/sale_product.png"} alt="" />

            <div className={styles.price}>{product.price == undefined ? "" : product.price.toLocaleString()} грн.</div>

            <div className={styles.size_container}>
              <div>Розмір</div>
              <div className={styles.container_flex + " " + styles.pointer} onClick={handlerOnClickSizeChart}>
                <img className={styles.img_size} src={props.localhostFrontend + "/img/size.png"} alt="" />
                <div className={styles.select_size}>Вибрати розмір</div>
              </div>
            </div>
            
            <div className={styles.sizes_container}>
              {
                sizes.map((size) =>
                {
                  return(
                    <div className={styles.size + " " + (currentSize.id == size.id ? styles.selected_size : "")}
                     onClick={handlerOnClickSize} data-size-id={size.id} data-size-title={size.title}>{size.title}</div>
                  )
                })
              }
            </div>
            <div className={styles.size_error + " " + (sizeErrorActive ? '' : styles.hidden)}>Оберіть, будь ласка, розмір!</div>
            <button className={styles.btn_buy} onClick={handlerOnClickAddToCart}>Додати до кошика</button>
          </div>
        </div>

        <div className={styles.characteristics_container}>
          <div className={styles.characteristics_title}>
            ХАРАКТЕРИСТИКИ
            <hr />
          </div>
          <div className={styles.characteristics_grid}>
            <div>Бренд:</div>
            <div>{characteristics.brand}</div>
            <div>Тип:</div>
            <div>{characteristics.type}</div>
            <div>Колір:</div>
            <div>{characteristics.color}</div>
            <div>Матеріал:</div>
            <div>{characteristics.material}</div>
          </div>
        </div>

        <div className={styles.feedbacks_container}>
          <div className={styles.feedbacks}>
            <div>Відгуки</div>
            <div className={styles.feedback_btn_container + " " + (user == null ? styles.hidden_none : "")}>
              <div className={styles.feedback_button + " " + (user == null ? styles.hidden_none : "") } onClick={handlerOnClickFeedback}>Написати відгук</div>
              <div className={styles.feedback_warning + " " + (isFeedbackErrorVisible ? "" : styles.hidden)}>Для того, щоб опублікувати відгук необхідно придбати товар</div>
            </div>
            <div className={styles.feedback_warning + " " + (user != null ? styles.hidden_none : "")}>Для того, щоб опублікувати відгук необхідно увійти в особистий кабінет та придбати товар</div>
          </div>
          <hr />
          <div className={styles.reviews_container}>
            {reviews.map((review) => 
            {
              return(
                <Review review={review} localhost={props.localhost} localhostFrontend={props.localhostFrontend}/>
              )
            })}
          </div>
        </div>
      </div>
    </>
);
}

export default ProductFull;
