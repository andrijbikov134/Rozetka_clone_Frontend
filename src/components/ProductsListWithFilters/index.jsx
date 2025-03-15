import { useEffect, useState } from 'react';

import styles from "./ProductsListWithFilters.module.css"
import Product from '../Product';
import Filters from '../Filters';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ProductsListWithFilters = (props) => {
  
  const navigate = useNavigate();
  let location = useLocation();

  // Властивість, яка зберігає список товарів / Зчитати список товарів з глобальної властивості
  const [products, setProducts] = useState([]); 

  const [categorySubSub, setCategorySubSub] = useState(location.pathname.split('/').pop());

  const [categoryTitle, setCategoryTitle] = useState('');
  
  const [filters, setFilters] = useState({ brands: [], countries: [], priceRange: {min: 0, max: 100000}, sizes: [] });

  const [sortOrder, setSortOrder] = useState("rating"); // Сортування за ціною

  const [currentUser, setCurrentUser] = useState(0);

  const [imgUrl, setImgUrl] = useState(props.googleBucketUrl + 'img/' + props.category + '/' + props.category_sub + '/' + categorySubSub + '/');

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

  const loadCategoryTitle = () => 
  {
    let category = categorySubSub + "_" + props.category;
    let url = `${props.localhost}/index.php?action=getCategorySubSubTitleUa&categorysubsub=${category}`;
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
      setCategoryTitle(response[0]['title_ua']);
    })
  }

  const loadProductSizes = (id) => 
  {
    let url;
    let action = 'getProductSizes';
    url = `${props.localhost}/index.php?action=${action}&productId=${id}`;
    
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
        setSizes(response);
    })
  }

   // Обробка сортування
  const handleSortChange = (event) => {
    const sort = event.target.value;
    setSortOrder(sort);
    setFilters({ ...filters, sort: sort });
  };

  const handlerOnClickAddNewProduct = () => 
  {
    navigate('/addnewproduct', {state:{product: null, category: props.category, categorySub: props.category_sub, categorySubSub: categorySubSub, categorySubSubUa: categoryTitle} });
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
        navigate('/addnewproduct', {state:{product: foundProduct[0], sizes: response, category: props.category, categorySub: props.category_sub, categorySubSub: categorySubSub, categorySubSubUa: categoryTitle} });
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

  // DELETE IMG IN GOOGLE
  // let url;
  // let action = 'deleteImgFromGoogleBucket';
  // url = `${props.localhost}/index.php?action=${action}`;
  // let formdata = new FormData();
  // formdata.append('imgPath', '');
  // fetch(url, {
  //   method: 'POST',
  //   header: {
  //     'Content-Type': 'application/json', 
  //   },
  //   body : formdata,
  // })
  // .then(response =>
  //     response.json()
  //   ).then((response) =>
  //   {
  //    response
  //   }
  //   )

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
        loadFilteredProducts())
  }

  useEffect(() => {
    loadCurrentUser();
  }, []);

  useEffect(() => {
    loadCategoryTitle();
  }, [products]);

  useEffect(() => {
    loadFilteredProducts();
  }, [filters]);


  return (
      <>
      <div className={styles.main_container}>
        <div className={styles.filters_container}>
          
          <Filters products={products} sortOrder={sortOrder} localhost={props.localhost} onFilterChange={setFilters} priceR={filters.priceRange}/>
        </div>
        <div className={styles.products_order_container}>
          <h2>{categoryTitle}</h2>
          <div className={styles.header}>
            {
              products.length > 0 ? 
              <div className={styles.count_found_products}>Знайдено {products.length} товарів</div> :
              <div></div>
            }
            {
              currentUser != 0 ? (currentUser.role != 'Administrator' ? '' :
              <>
                <div className={styles.button_add_new_product} onClick={handlerOnClickAddNewProduct}>
                Додати новий товар
              </div>
              </>
              ) : ''
            }
            <div className={styles.sort_price}>
              <select value={sortOrder} onChange={handleSortChange}>
                <option value="rating">За популярністю</option>
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
                      <Product id={product.id} img={product.pictures_path} title={product.title} price={product.price} priceWithDiscount={product.price_with_discount} new_product={product.new_product} key={product.id} handlerOnClickProduct={props.handlerOnClickProduct} handlerOnClickEditProduct={handlerOnClickEditProduct} handlerOnClickAddToCart={props.handlerOnClickAddToCart} handlerOnClickDeleteProduct={handlerOnClickDeleteProduct} handlerOnClickCopyProduct={handlerOnClickCopyProduct} handlerOnClickHideProduct={handlerOnClickHideProduct} localhostFrontend={props.localhostFrontend} googleBucketUrl={props.googleBucketUrl}/>
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
