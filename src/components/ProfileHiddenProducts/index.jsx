import {useState, useEffect} from 'react';
import styles from './ProfileHiddenProducts.module.css';
import { useNavigate } from 'react-router-dom';

const ProfileHiddenProducts = ({localhost, googleBucketUrl}) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const loadProducts = () => 
  {
    fetch(`${localhost}/index.php?action=getHiddenProducts`, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json', 
      },
    })
    .then(response =>
      response.json()
      )
    .then(response => {
      setProducts(response);
    })
  }
  const handlerOnClickVisible = (event) =>
  {
    let url;
    let id = event.currentTarget.dataset.id;
    let action = 'changeIsHidden';
    url = `${localhost}/index.php?action=${action}&id=${id}`;
    fetch(url, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json', 
      },
    })
    .then(response =>
        loadProducts())
  }

  const handlerOnClickEditProduct = (event) => 
  {
    let id = event.currentTarget.dataset.id;
    let foundProduct = products.filter((product) => product.id == id);
    let action = 'getProductSizes';
    let url = `${localhost}/index.php?action=${action}&productId=${id}`;
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

  useEffect(() => {
    loadProducts();
    return () => {
      
    };
  }, []);

  return (
    <>
      <div className={styles.main_container}>
        {products.length > 0 ?
         <div className={styles.grid}>
         <div className={styles.grid_cell}></div>
         <div className={styles.grid_cell}>Артикул</div>
         <div className={styles.grid_cell}>Товар</div>
         <div className={styles.grid_cell}>Ціна</div>
         <div className={styles.grid_cell}></div>
         <div className={styles.grid_cell}></div>
         <div className={styles.grid_border_solid}></div>
         {
           products.map((product) => 
           {
             return(
               <>
                 <div className={styles.grid_ceil}><img className={styles.img} src={googleBucketUrl + product.pictures_path} alt="" /></div>
                 <div className={styles.grid_cell}>{product.part_number}</div>
                 <div className={styles.grid_cell_title}>{product.title}</div>
                 <div className={styles.grid_cell_price}>{product.price}</div>
                 <div className={styles.button} onClick={handlerOnClickEditProduct} data-id={product.id}>Редагувати</div>
                 <div className={styles.grid_cell_button} onClick={handlerOnClickVisible} data-id={product.id}>Відновити</div>
               </>
             )
           })
         }
       </div> : <></>
        }
      </div>
    </>
  );
}

export default ProfileHiddenProducts;
