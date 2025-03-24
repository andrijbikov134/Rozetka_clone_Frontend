import React, { useContext, useEffect, useId, useState } from 'react';
import styles from "./ListProductsSearchResult.module.css"
import Product from '../Product';
import Filters from '../Filters';
import { useLocation } from 'react-router-dom';

const ListProductsSearchResult = (props) => {

  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [inputTitle, setInputTitle] = useState(location.state.input_title);
  // Властивість, яка зберігає список подій / Зчитати список подій з глобальної властивості
  const [filters, setFilters] = useState({ brands: [], countries: [], priceRange: {min: 0, max: 100000}, sizes: [] });
  const [sortOrder, setSortOrder] = useState("rating"); // Сортування за ціною

  const [currentUser, setCurrentUser] = useState(0);

  const createFormData = () =>
  {
    let formData = {brands: [], priceRange: {min: 0, max: 0}, sizes: [], countries: [], sort: ''};

    filters.brands.map((brand) =>{
    formData.brands.push(brand.id);
    });

    filters.sizes.map((size) =>{
      formData.sizes.push(size.id);
      });

    filters.countries.map((country) =>{
      formData.countries.push(country.id);
      });

    formData.priceRange = filters.priceRange;
    formData.sort = sortOrder;

    return formData;
  }

  const loadSearchProducts = () =>
  {
    let url = `${props.localhost}/index.php?action=getProductsFilteredByTitle&input_title=${inputTitle}`;
    let formData = createFormData();
      fetch(url, {
        method: 'POST',
        header: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(formData),

      })
      .then(response =>
        response.json()
        )
      .then(response => {
        setProducts(response);
      })

  }

  const handleSortChange = (event) => 
  {
    const sort = event.target.value;
    setSortOrder(sort);
    setFilters({ ...filters, sort: sort });
  };

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
          loadSearchProducts();
      }
      )
  }

  useEffect(() => {
    loadSearchProducts();
    setInputTitle(location.state.input_title)
    return () => {
      
    };
  }, [filters,location, inputTitle]);

  return (
      <>
        <div className={styles.main_container}>
          <div className={styles.filters_container}>
            <Filters products={products} sortOrder={sortOrder} localhost={props.localhost} onFilterChange={setFilters} priceR={filters.priceRange}/>
          </div>
          
          <div className={styles.container}>
            <h2 className={styles.category_title}>Пошук</h2>
            <div className={styles.header}>
                {
                  products.length > 0 ?
                  (<div className={styles.count_found_products}>
                    За запитом «{inputTitle}» знайдено товарів: {products.length}
                  </div>) : <div></div>
                }
                {
                  currentUser != 0 ? (currentUser.role != 'Administrator' ? '' :
                  <>
                    <div> 
                  </div>
                  </>
                  ) : ''
                }
                {
                  products.length > 0 ? <div className={styles.sort_price}>
                  <select className={styles.sort_price} value={sortOrder} onChange={handleSortChange}>
                    <option value="rating">За популярністю</option>
                    <option value="asc">Від дешевих до дорогих</option>
                    <option value="desc">Від дорогих до дешевих</option>
                  </select>
                </div> : <></>
                }
                
              </div>
              <div className={styles.container_products}>
                {
                  products.length > 0 ?
                  
                  products.map((product) => 
                    {  
                      return (
                          <Product id={product.id} img={product.pictures_path} title={product.title} price={product.price} priceWithDiscount={product.price_with_discount} new_product={product.new_product} key={product.id} handlerOnClickProduct={props.handlerOnClickProduct} handlerOnClickAddToCart={props.handlerOnClickAddToCart} localhostFrontend={props.localhostFrontend} handlerOnClickEditProduct={handlerOnClickEditProduct} handlerOnClickDeleteProduct={handlerOnClickDeleteProduct} handlerOnClickCopyProduct={handlerOnClickCopyProduct} handlerOnClickHideProduct={handlerOnClickHideProduct} googleBucketUrl={props.googleBucketUrl}/>
                        );
                    }) : 
                    <>
                    <div className={styles.error_container}>
                      <h2>Нажаль, за вашим запитом нічого не знайдено!</h2>
                      <div>Спробуйте змінити запит</div>
                    </div>
                    </>  
                }
              </div>
          </div>
        </div>
      </>  
  );
}

export default ListProductsSearchResult;
