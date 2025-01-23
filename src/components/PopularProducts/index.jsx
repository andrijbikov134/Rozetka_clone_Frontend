import React, { useContext, useEffect, useId, useState } from 'react';
import styles from "./PopularProducts.module.css"
import { EventsContext, SelectedDateContext } from '../../context';
import Product from '../Product';

const PopularProducts = (props) => {

  // Властивість, яка зберігає список подій / Зчитати список подій з глобальної властивості
  const [products, setAllProducts] = useState(props);
  // Властивість, яка зберігає поточну обрану дату

  // t1 - змінна
  // setT1 - назва функції, яка викликається
    
  // Хук - згенерувати Id для кожної події
   const inputEventTextId = useId();

  return (
      <>
        <div className={styles.container}>
          <div className={styles.header}>ПОПУЛЯРНІ ТОВАРИ</div>
          <div className={styles.container_products}>
            
            {props.products.map((product) => {
                      return (
                        <>
                        <Product img={product.pictures_path} title={product.title} price={product.price} key={product.id}/>
                        {/* <div className={styles.event__container} key={event.id}>
                          <div className={styles.event__container_flex}>
                            <img className={styles.img} src="./img/Task.png" alt="" />
                            <input id={event.id} type="text" defaultValue={event.body} readOnly={true} className={styles.input_readonly} onKeyDown={handleEditEventEnter} data-id={event.id}/>
                          </div>
                          
                          <div className={styles.event__container_flex +" " + styles.gap}>
                            <img className={styles.event__button_edit} src="./img/Edit.png" alt="" onClick={handleEditEventClick} data-id={event.id}/>
                            <img className={styles.event__button} src="./img/Delete.png" alt="" onClick={props.handleDeleteEventClick} data-id={event.id}/>
                          </div>
                        </div>  */}
                        </>
                        )
                      })}
            {/* img="asdasd" title={products[0].title}  price={products[0].price} */}
            
          </div>
        </div>
      </>  
  );
}

export default PopularProducts;
