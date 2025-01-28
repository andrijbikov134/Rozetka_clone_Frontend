import React, { useContext, useEffect, useId, useState } from 'react';
import styles from "./ProductFull.module.css"
import { Link } from 'react-router-dom';

const ProductFull = (props) => {

  const [characteristics, setCharacteristics] = useState();

  const handlerOnClickAddToCart = () =>
  {
    props.handlerOnClickAddToCart(props.product.id);
  }

  const fetchRequest = (url) =>
  {
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

  const loadCharacteristics = () =>
  {
    let url;
    let action = 'getProductCharacteristics';
    url = `${props.localhost}/index.php?action=${action}&id=${props.product.brand_id}`;
    fetchRequest(url);
  }

  useEffect(() => {
    loadCharacteristics();
  }, []);

  return (
      <>
        <div className={styles.main_container}>
          <div className={styles.product_container}>

            <img className={styles.img} src={props.localhostFrontend + "/" + props.product.pictures_path} alt="" />
            <div className={styles.container_column}>
              <div className={styles.title}>{[props.product.title]}</div>
              <div>
                <div className={styles.purt_number}>Артикул: {[props.product.part_number]}</div>
              </div>
              <div className={styles.price}>{props.product.price} грн.</div>
              
              <div className={styles.size_container}>Розмір</div>
              <div className={styles.sizes_container}>
                <div className={styles.size}>38</div>
                <div className={styles.size}>39</div>
                <div className={styles.size}>40</div>
                <div className={styles.size}>41</div>
              </div>

              <button className={styles.btn_buy} onClick={handlerOnClickAddToCart}>Додати до кошика</button>
            </div>
          </div>

          <div className={styles.characteristics_container}>
            <div className={styles.characteristics_title}>
              ХАРАКТЕРИСТИКИ
              <hr />
            </div>
            <div className={styles.characteristics_grid}>
              {/* <div>Бренд:</div>
              <div>{characteristics.brand}</div>
              <div>Тип:</div>
              <div>{characteristics.type}</div>
              <div>Колір:</div>
              <div>{characteristics.color}</div>
              <div>Матеріал:</div>
              <div>{characteristics.material}</div> */}
            </div>
          </div>

          <div className={styles.feedbacks_container}>
            <div className={styles.feedbacks}>
              <div>Відгуки</div>
              <div className={styles.feedback}><Link to="/feedback">Написати відгук</Link> </div>
            </div>
            <hr />
            <div>
            </div>
          </div>
        </div>


      </>
  );
}

export default ProductFull;
