import styles from "./Delivery.module.css";
import { Link } from "react-router-dom";

const Delivery = () =>
{
  return(
    <>
      <div className={styles.main_container}>
        <h2>ДОСТАВКА</h2>
        <h3>Вартість доставки</h3>
        <div>
          Ми здійснюємо доставку товарів по всій території України.
        </div>
        <br />

        <div className={styles.flex_column}>
          <div className={styles.flex_row}>
            <img className={styles.img_mark} src="./img/circle.png" alt=""/>
            <div>Способи доставки:</div>
          </div>
          
          <ul className={styles.ul}>
            <li>Нова пошта</li>
            <li>Укрпошта </li>
            <li>Самовивіз з наших магазинів</li>
          </ul>          
           
          <div>
          З переліком магазинів Ви можете ознайомитися <Link to='/shops'><span className={styles.link_shops}> тут</span></Link> 
          </div>
        </div>
      </div>
    </>
  );
}

export default Delivery