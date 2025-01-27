import React, { useContext, useEffect, useId, useState } from 'react';
import styles from "./Cart.module.css"
import CartProductRow from '../CartProductRow';


const Cart = (props) => {

  const [cartProducts, setCartProducts] = useState([]);

  const getProductFromDB = (id) =>
  {
    let product;
    let url = `http://localhost:8888/index.php?action=getProductById&id=${id}`;
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
      product = response;
    })
    return product;
  }

  const loadProducts = () =>
  {
    let newCartProducts = props.products.map(
      (product) =>
      {
        let newProduct = getProductFromDB(product.id);
        return {
          product: newProduct,
          quantity: product.quantity
        }
      }
    );
  }


  useEffect(() => {
    loadProducts(props.products);
  }, []);
  
  return (
      <>
      <div className={styles.main_container}>
        <h2>Кошик</h2>
        <div className={styles.grid_container}>
          {
            cartProducts.map((item) =>
            {
              <CartProductRow product={item.product} quantity={item.quantity} />
            }
            )
          }
        </div>
      </div>  
      </>
  );
}

export default Cart;
