import React, { useContext, useEffect, useId, useState } from 'react';

import styles from "./ListProducts.module.css"
import Product from '../Product';
import News from '../News';
import { useLocation } from 'react-router-dom';

const ListProducts = (props) => {

  let location = useLocation();
  // Властивість, яка зберігає список подій / Зчитати список подій з глобальної властивості
  const [products, setProducts] = useState([]);

  const loadProductsFromDB = () =>
  {
    
    let url
    if(props.action == 'getPopularProducts')
    {
      url = `${props.localhost}/index.php?action=getPopularProducts`;
      props.handlerSearchTitleClean(); 
    }
    else
    {
      url = `${props.localhost}/index.php?action=getProducts&categoryid=${props.category_id}&categorysubid=${props.category_sub_id}&categorysubsubid=${props.category_sub_sub_id}`;
    }
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
      setProducts(response);
    })
  }

  useEffect(() =>
    {
      loadProductsFromDB();  
    },
    [])

  return (
      <>
      <div className={styles.main_container}>
        {props.action == 'getPopularProducts' ? <News/> : <></>}
        <div className={styles.container}>
          <div className={styles.header}>{props.title}</div>
          <div className={styles.container_products}>            
            {products.map((product) => 
              {
                      
                return (
                  <>
                    <Product id={product.id} img={product.pictures_path} title={product.title} price={product.price} key={product.id} handlerOnClickProduct={props.handlerOnClickProduct} handlerOnClickAddToCart={props.handlerOnClickAddToCart} localhostFrontend={props.localhostFrontend}/>
                  </>
                  )
              })}            
          </div>
        </div>
      </div>
      </>  
  );
}

export default ListProducts;
