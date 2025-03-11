import React, { useContext, useEffect, useId, useState } from 'react';

import styles from "./ListProducts.module.css"
import Product from '../Product';
import News from '../News';
import { useNavigate, Link } from 'react-router-dom';

const ListProducts = (props) => {

  // Властивість, яка зберігає список подій / Зчитати список подій з глобальної властивості
  const [popularProducts, setPopularProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);


  const navigate = useNavigate();

  const loadPopularProducts = () =>
  {
    let url = `${props.localhost}/index.php?action=getPopularProducts`;
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
      setPopularProducts(response);
    }) 
  }

  const loadSaleProducts = () =>
  {
    let url = `${props.localhost}/index.php?action=getSaleProducts`;
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
      setSaleProducts(response);
    }) 
  }

  const loadNewProducts = () =>
    {
      let url = `${props.localhost}/index.php?action=getNewProducts`;
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
        setNewProducts(response);
      }) 
    }

  const handlerOnClickEditProduct = (id) => 
  {
    let foundProduct = popularProducts.filter((product) => product.id == id);
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
          //loadFilteredProducts();
        }
      }
      )
  }

  const handlerOnClickHideProduct = (id) =>
  {
    let url;
    let action = 'changeIsHidden';
    url = `${props.localhost}/index.php?action=${action}&id=${id}`;
    fetch(url, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json', 
      },
    })
    .then(response =>
        {
          loadPopularProducts()
          loadSaleProducts();
          loadNewProducts();
      }
      )
  }

  const handlerOnClickCopyProduct = (id) =>
  {
    let foundProduct = products.filter((product) => product.id == id);
    foundProduct[0].id = null;
    foundProduct[0].pictures_path = '';

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
        navigate('/addnewproduct', {state:{product: foundProduct[0], sizes: response, category: props.category, categorySub: props.category_sub, categorySubSub: categorySubSub, categorySubSubUa: categoryTitle} });
    })
  }

  useEffect(() =>
    {
      loadPopularProducts();  
      loadSaleProducts();
      loadNewProducts();
    },
    [])

  return (
      <>
      <div className={styles.main_container}>
        <News/>
        <div className={styles.products_container}>
          <div className={styles.header_sale}>
            <div className={styles.header}>
              ЗНИЖКИ
            </div>
            <div className={styles.all_sales}>
              <Link to="/sale">Показати всі</Link>
            </div>
          </div>
          <div className={styles.sale_products_container}>            
            {saleProducts.map((product, index) => 
              {
                if(index < 4)
                {
                  return (
                    <>
                      <Product id={product.id} img={product.pictures_path} title={product.title} price={product.price} priceWithDiscount={product.price_with_discount} new_product={product.new_product} key={product.id} handlerOnClickProduct={props.handlerOnClickProduct} handlerOnClickAddToCart={props.handlerOnClickAddToCart} localhostFrontend={props.localhostFrontend}  handlerOnClickEditProduct={handlerOnClickEditProduct} handlerOnClickDeleteProduct={handlerOnClickDeleteProduct} handlerOnClickCopyProduct={handlerOnClickCopyProduct} handlerOnClickHideProduct={handlerOnClickHideProduct} googleBucketUrl={props.googleBucketUrl}/>
                    </>
                    )
                }                      
              })}            
          </div>
        </div>
        <div className={styles.products_container}>
          <div className={styles.header_sale}>
            <div className={styles.header}>
            НОВИНКИ
            </div>
            <div className={styles.all_sales}>
              <Link to="/newproducts">Показати всі</Link>
            </div>
          </div>
          <div className={styles.new_products_container}>            
            {newProducts.map((product,index) => 
              {
                      
                if(index < 12)
                  {
                    return (
                      <>
                        <Product id={product.id} img={product.pictures_path} title={product.title} price={product.price} priceWithDiscount={product.price_with_discount} new_product={product.new_product} key={product.id} handlerOnClickProduct={props.handlerOnClickProduct} handlerOnClickAddToCart={props.handlerOnClickAddToCart} localhostFrontend={props.localhostFrontend} handlerOnClickEditProduct={handlerOnClickEditProduct} handlerOnClickDeleteProduct={handlerOnClickDeleteProduct} handlerOnClickHideProduct={handlerOnClickHideProduct} googleBucketUrl={props.googleBucketUrl}/>
                      </>
                      )
                  }                      
                })}         
          </div>
        </div> 
        <div className={styles.products_container}>
          <div className={styles.header}>{props.title}</div>
          <div className={styles.popular_products_container}>            
            {popularProducts.map((product) => 
              {
                      
                return (
                  <>
                    <Product id={product.id} img={product.pictures_path} title={product.title} price={product.price} priceWithDiscount={product.price_with_discount} key={product.id} new_product={product.new_product} handlerOnClickProduct={props.handlerOnClickProduct} handlerOnClickAddToCart={props.handlerOnClickAddToCart} localhostFrontend={props.localhostFrontend}  handlerOnClickEditProduct={handlerOnClickEditProduct} handlerOnClickDeleteProduct={handlerOnClickDeleteProduct} handlerOnClickHideProduct={handlerOnClickHideProduct} googleBucketUrl={props.googleBucketUrl}/>
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
