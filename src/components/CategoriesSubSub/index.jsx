import styles from "./CategoriesSubSub.module.css";
import CategoryItem from '../CategoryItem';
import { useState, useEffect } from "react";

const CategoriesSubSub = (props) =>
{
  const [categories, setCategories] = useState([]);
  
  const loadCategories = () =>
  {
    let url = `http://localhost:8888/index.php?action=getCategories&category=${props.category}&categorysub=${props.category_sub}`
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
      setCategories(response);
    })
  }

  useEffect(() => {
    loadCategories();
  }, [props]);

  return (
    <>
    <div className={styles.main_container} >
      <div className={styles.grid_container}>
        {categories.map((item) =>
        {
          return <CategoryItem item={item} category={props.category} category_sub={props.category_sub}/>
        })}
      </div>
    </div>
    </>
  );

}

export default CategoriesSubSub;