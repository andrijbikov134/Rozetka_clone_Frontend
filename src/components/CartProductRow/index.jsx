import React, { useContext, useEffect, useId, useState } from 'react';
import styles from "./CartProductRow.module.css"


const CartProductRow = (props) => {
  
  const handlerOnClickDelete = () =>
  {
    props.handlerOnClickDelete(props.product.id, props.size.id);
  }


  return (
      <>
        <div className={styles.ceil_container}>
          <div className={styles.img_container}>
            <img className={styles.img_product} src={props.product.pictures_path} alt="" />
          </div>
          <div className={styles.product_description}>
            <div className={styles.title}>{props.product.title}</div>
            <div className={styles.container_flex_characteristics}>
              <div>Розмір:</div>
              <div>{props.size.title}</div>
            </div>
            <div className={styles.container_flex_characteristics}>
              <div>Колір:</div>
              <div>{props.color}</div>
            </div>
            <div className={styles.container_flex_characteristics}>
              <div>Артикул:</div>
              <div>{props.product.part_number}</div>
            </div>
          </div>
        </div>
        <div className={styles.ceil_container}>
          <div className={styles.price}>{props.product.price.toLocaleString()} грн.</div>
        </div>
        <div className={styles.ceil_container}>
          <div className={styles.quantity}>{props.quantity}</div>
        </div>
        <div className={styles.ceil_container}>
          <div className={styles.total_sum}>{(props.quantity * props.product.price).toLocaleString()} грн.</div>
        </div>
        <div className={styles.btn_delete} >
          <img className={styles.img_delete} src={props.localhostFrontend + '/img/delete.png'} alt="" onClick={handlerOnClickDelete}/>
        </div>
      </>
  );
}

export default CartProductRow;
