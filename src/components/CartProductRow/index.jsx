import React, { useContext, useEffect, useId, useState } from 'react';
import styles from "./CartProductRow.module.css"


const CartProductRow = (props) => {
  
  return (
      <>
        <div className={styles.ceil_container}>
          <div className={styles.img_container}>
            <img className={styles.img} src={props.product.pictures_path} alt="" />
          </div>
          <div className={styles.product_description}>
            <div>{props.product.title}</div>
            <div>{props.product.size}</div>
            <div>{props.product.color}</div>
            <div>{props.product.part_number}</div>
          </div>
        </div>
        <div className={styles.ceil_container}>
          <div className={styles.price}>{props.product.price}</div>
        </div>
        <div className={styles.ceil_container}>
          <div className={styles.quantity}>{props.quantity}</div>
        </div>
        <div className={styles.ceil_container}>
          <div className={styles.total_sum}>{props.quantity * props.product.price}</div>
        </div>
      </>
  );
}

export default CartProductRow;
