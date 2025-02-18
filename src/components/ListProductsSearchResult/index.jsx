import React, { useContext, useEffect, useId, useState } from 'react';
import styles from "./ListProductsSearchResult.module.css"
import Product from '../Product';

const ListProductsSearchResult = (props) => {

  // Властивість, яка зберігає список подій / Зчитати список подій з глобальної властивості

  return (
      <>
        <div className={styles.main_container}>
        <div className={styles.container}>
            {
              props.products.length > 0 ?
              (<div className={styles.header}>
                За запитом «{props.search_title}» знайдено товарів: {props.products.length}
              </div>) : <></>
            }
            <div className={styles.container_products}>
              {
                props.products.length > 0 ? 
                props.products.map((product) => 
                  {  
                    return (
                        <Product img={product.pictures_path} title={product.title} price={product.price} key={product.id} localhostFrontend={props.localhostFrontend} id={product.id} handlerOnClickProduct={props.handlerOnClickProduct}/>
                      );
                  }) : <></>  
              }
            </div>
            {
              props.products.length == 0 ?
              <div className={styles.error_container}>
              <h2>Пошук</h2>
              <h2>Нажаль, за вашим запитом нічого не знайдено!</h2>
              <div>Спробуйте змінити запит</div>
            </div> : <></>
            }
            <div/>
          </div>
        </div>
      </>  
  );
}

export default ListProductsSearchResult;
