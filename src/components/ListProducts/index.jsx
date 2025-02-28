import React, { useContext, useEffect, useId, useState } from 'react';

import styles from "./ListProducts.module.css"
import Product from '../Product';
import News from '../News';
import { useNavigate } from 'react-router-dom';

const ListProducts = (props) => {

  // Властивість, яка зберігає список подій / Зчитати список подій з глобальної властивості
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

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

  const handlerOnClickEditProduct = (id) => 
  {
    let foundProduct = products.filter((product) => product.id == id);
    let action = 'getProductSizes';
    let url = `${props.localhost}/index.php?action=${action}&productId=${id}`;
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
        navigate('/addnewproduct', {state:{product: foundProduct[0], sizes: response} });
    })
  }
  
  const handlerOnClickDeleteProduct = (id, img) =>
  {
    let url;
    let action = 'deleteProductFromDB';
    url = `${props.localhost}/index.php?action=${action}`;
    
    fetch(url, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json', 
      },
      body : JSON.stringify({id: id, imgPath: img}),
    })
    .then(response =>
        response.json()
      ).then((response) =>
      {
        if(response.error != "OK")
        {
          alert(response.error);
        }
        else
        {

          loadFilteredProducts();
        }
      }
      )
  }

  useEffect(() =>
    {
      loadProductsFromDB();  
    },
    [])

  return (
      <>
      <div className={styles.main_container}>
        <News/> 
        <div className={styles.popular_products_container}>
          <div className={styles.header}>{props.title}</div>
          <div className={styles.container_products}>            
            {products.map((product) => 
              {
                      
                return (
                  <>
                    <Product id={product.id} img={product.pictures_path} title={product.title} price={product.price} key={product.id} handlerOnClickProduct={props.handlerOnClickProduct} handlerOnClickAddToCart={props.handlerOnClickAddToCart} localhostFrontend={props.localhostFrontend}  handlerOnClickEditProduct={handlerOnClickEditProduct} handlerOnClickDeleteProduct={handlerOnClickDeleteProduct} googleBucketUrl={props.googleBucketUrl}/>
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
