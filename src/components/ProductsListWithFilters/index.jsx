import { useEffect, useState } from 'react';

import styles from "./ProductsListWithFilters.module.css"
import Product from '../Product';
import { useLocation } from 'react-router-dom';

const ProductsListWithFilters = (props) => {

  let location = useLocation();
  // Властивість, яка зберігає список подій / Зчитати список подій з глобальної властивості
  const [products, setProducts] = useState([]);

  const [categorySubSub, setCategorySubSub] = useState(location.pathname.split('/').pop());

  const [categoryTitle, setCategoryTitle] = useState('');

  useEffect(() => {
    //loadCategoryTitle();
    loadProductsFromDB();
   
  }, []);

  useEffect(() => {
    
  }, [categorySubSub]);




  const loadProductsFromDB = () =>
  {
    let newCategorySubSub = location.pathname.split('/').pop();
    setCategorySubSub(newCategorySubSub);
    let url;
    if(props.action == 'getProductsWithoutFilters')
    {
      url = `${props.localhost}/index.php?action=getProductsWithoutFilters&category=${props.category}&categorysub=${props.category_sub}&categorysubsub=${newCategorySubSub}`;
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
      loadCategoryTitle();
    })

  }

  const loadCategoryTitle = () => 
  {
    let category = categorySubSub + "_" + props.category;
    let url = `${props.localhost}/index.php?action=getCategorySubSubTitle&categorysubsub=${category}`;
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
      setCategoryTitle(response[0][0]);
    })
  }


  return (
      <>
      <div className={styles.main_container}>
        <div className={styles.filters_container}></div>
        <div className={styles.products_order_container}>
          <h2>{categoryTitle}</h2>
          <div className={styles.container}>
            <div className={styles.header}>{props.title}</div>
            <div className={styles.container_products}>            
              {products.map((product) => 
                {     
                  return (
                    <>
                      <Product id={product.id} img={props.localhostFrontend + product.pictures_path} title={product.title} price={product.price} key={product.id} handlerOnClickProduct={props.handlerOnClickProduct} handlerOnClickAddToCart={props.handlerOnClickAddToCart} localhostFrontend={props.localhostFrontend}/>
                    </>
                    )
                })}            
            </div>
          </div>
        </div>
      </div>
      </>  
  );
}

export default ProductsListWithFilters;
