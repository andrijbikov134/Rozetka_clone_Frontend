import React, { useContext, useEffect, useId, useState } from 'react';
import styles from "./ProductFull.module.css"
import { Link } from 'react-router-dom';

const ProductFull = (props) => {

  const handlerOnClickAddToCart = () =>
  {
    props.handlerOnClickAddToCart(props.product.id);
  }

  return (
      <>
        <div className={styles.main_container}>
          <div className={styles.product_container}>

            <img className={styles.img} src={'.' + props.product.pictures_path} alt="" />
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
              <div>Стать:</div>
              <div></div>
              <div>Бренд:</div>
              <div></div>
              <div>Тип:</div>
              <div></div>
              <div>Колір:</div>
              <div></div>
              <div>Матеріал:</div>
              <div></div>
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
