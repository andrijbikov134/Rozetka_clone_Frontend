import { useNavigate } from "react-router-dom";
import styles from "./CategoryItem.module.css"

const CategoryItem = (props) =>
{
  const navigate = useNavigate();
  const handlerOnClick = (event) =>
  {
    let splitedTitles = props.item.title.split("_");
    let categorySubSub = splitedTitles[0];
    let route = `/${props.category}/${props.category_sub}/${categorySubSub}`;
    navigate(route);
  }

  return (
    <>
    <div className={styles.main_container} onClick={handlerOnClick}>
       <img className={styles.img} src={props.item.pictures_path} alt="" />
      <div className={styles.title}>{props.item.title_ua}</div>
    </div>
    </>
  );

}

export default CategoryItem