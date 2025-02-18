import { useEffect, useState } from 'react';

import styles from "./ProductsListWithFilters.module.css"
import Product from '../Product';
import Filters from '../Filters';
import { useLocation } from 'react-router-dom';

const ProductsListWithFilters = (props) => {

  let location = useLocation();
  // Властивість, яка зберігає список подій / Зчитати список подій з глобальної властивості
  const [products, setProducts] = useState([]);

  const [categorySubSub, setCategorySubSub] = useState(location.pathname.split('/').pop());

  const [categoryTitle, setCategoryTitle] = useState('');
  
  const [filters, setFilters] = useState({ brands: [], priceRange: {min: 0, max: 10000}, sizes: [] });

  const [sortOrder, setSortOrder] = useState("rating"); // Сортування за ціною

  const [currentUser, setCurrentUser] = useState(0);

  const createFormData = () =>
  {
    let formData = {brands: [], priceRange: {min: 0, max: 0}, sizes: [], sort: ''};

    filters.brands.map((brand) =>{
    formData.brands.push(brand.id);
    });

    filters.sizes.map((brand) =>{
      formData.sizes.push(brand.id);
      });

    formData.priceRange = filters.priceRange;
    formData.sort = sortOrder;

    return formData;
  }

  const loadFilteredProducts = () =>
  {
    let newCategorySubSub = location.pathname.split('/').pop();
    setCategorySubSub(newCategorySubSub);
    let url = `${props.localhost}/index.php?action=getProductsWithFilters&category=${props.category}&categorysub=${props.category_sub}&categorysubsub=${newCategorySubSub}`;

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
    .then(response =>
    {
      setProducts(response);  
    })
  }

  const loadPriceRange = () =>
  {
    let newPriceRange = {min: Number.MAX_SAFE_INTEGER, max: 0};
    products.map((product) => 
      {
        if(product.price > newPriceRange.max)
        {
          newPriceRange.max = product.price;
        }
        else if(product.price < newPriceRange.min)
        {
          newPriceRange.min = product.price;
        }
    })
    if(filters.priceRange.min != newPriceRange.min || filters.priceRange.max != newPriceRange.max)
    {
      setFilters({...filters, priceRange: newPriceRange});
    }
  }

  const loadCurrentUser = () =>
  {
    let user = JSON.parse(localStorage.getItem('user_petrushka_style')) || [];
    if(user.length == 0)
    {
      setCurrentUser(JSON.parse(sessionStorage.getItem('user_petrushka_style')) || 0);
    }
    else
    {
      setCurrentUser(user);
    }
  }

  useEffect(() => {
    loadCurrentUser();
    loadProductsFromDB();
  }, []);

  useEffect(() => {
    //loadPriceRange();
  }, [products]);

  useEffect(() => {
    loadFilteredProducts();
  }, [filters]);


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

   // Обробка сортування
  const handleSortChange = (event) => {
    const sort = event.target.value;
    setSortOrder(sort);
    setFilters({ ...filters, sort: sort });
  };


  return (
      <>
      <div className={styles.main_container}>
        <div className={styles.filters_container}>
          <Filters sortOrder={sortOrder} localhost={props.localhost} onFilterChange={setFilters} priceR={filters.priceRange}/>
        </div>
        <div className={styles.products_order_container}>
          <h2>{categoryTitle}</h2>
          <div className={styles.header}>
            {
              currentUser != 0 ? (currentUser.role != 'Administrator' ? "" :
              <div className={styles.button_add_new_product}>
                Add new product
              </div>) : <div></div>
            }
            <div className={styles.sort_price}>
              <select value={sortOrder} onChange={handleSortChange}>
                <option value="rating">За рейтингом</option>
                <option value="asc">Від дешевих до дорогих</option>
                <option value="desc">Від дорогих до дешевих</option>
              </select>
            </div>
          </div>
          <div className={styles.products_order_container}>
            <div className={styles.header}>{props.title}</div>
            {
              products.length == 0 ? <div>Нажаль, за даними критеріями нічого не знайдено. Змініть, будь ласка, параметри.</div> : 
              <div className={styles.grid_products}> 
                {products.map((product) => 
                {     
                  return (
                    <>
                      <Product id={product.id} img={props.localhostFrontend + product.pictures_path} title={product.title} price={product.price} key={product.id} handlerOnClickProduct={props.handlerOnClickProduct} handlerOnClickAddToCart={props.handlerOnClickAddToCart} localhostFrontend={props.localhostFrontend}/>
                    </>
                    )
                })}
              </div> 
            }
            
          </div>
        </div>
      </div>
      </>  
  );
}

export default ProductsListWithFilters;
