import React, { useContext, useEffect, useId, useState } from 'react';
import styles from "./ListProducts.module.css"
import Product from '../Product';


const ListProducts = (props) => {

  // Властивість, яка зберігає список подій / Зчитати список подій з глобальної властивості
  const [products, setProducts] = useState([]);
  // Властивість, яка зберігає поточну обрану дату

  // Хук - згенерувати Id для кожної події
   const inputEventTextId = useId();

  const loadProductsFromDB = () =>
  {
    let url = `http://localhost:8888/index.php?action=getProducts&categoryid=${props.category_id}&categorysubid=${props.category_sub_id}&categorysubsubid=${props.category_sub_sub_id}`
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
        <div className={styles.container}>
          <div className={styles.header}>{props.products_title}</div>
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
      </div>
      </>  
  );
}

export default ListProducts;
