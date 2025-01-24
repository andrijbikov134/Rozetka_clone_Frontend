import styles from "./Sizes.module.css";

const Sizes = () =>
{


  return(
    <>
      <div className={styles.main_container}>
        <h1>Таблиця розмірів</h1>
        <h2>Розміри дорослого одягу</h2>
        <img src="./img/Size_adult.png" alt="" />
        <h2>Розміри дитячого одягу</h2>
        <img src="./img/Size_children.png" alt="" />
      </div>
    </>
  );
}

export default Sizes