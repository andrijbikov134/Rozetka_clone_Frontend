import styles from "./CategoriesSubSub.module.css";
import CategoryItem from '../CategoryItem';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CategoriesSubSub = (props) =>
{
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  
  const loadCategories = () =>
  {
    let url = `${props.localhost}/index.php?action=getCategories&category=${props.category}&categorysub=${props.category_sub}`
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

  const handlerOnClick = (event) =>
  {
    let splitedTitles = event.target.dataset.categorysubsub.split("_");
    let categorySubSub =splitedTitles[0];
    let route = `/${props.category}/${props.category_sub}/${categorySubSub}`;
    navigate(route);
  }

  useEffect(() => {
    loadCategories();
  }, [props]);

  return (
    <>
    <div className={styles.main_container} >
      <div className={styles.categories_container}>
        {categories.map((category) => 
        {
          return(
            <div className={styles.category} onClick={handlerOnClick} data-categorysubsub={category.title}>
                  {category.title_ua}
                  <hr className={styles.hr} />
            </div>
          )
        })}
      </div>
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