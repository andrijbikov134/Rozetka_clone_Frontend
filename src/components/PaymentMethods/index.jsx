import styles from "./PaymentMethods.module.css";
import { Link } from "react-router-dom";

const PaymentMethods = () =>
{
  return(
    <>
      <div className={styles.main_container}>
        <h2>СПОСОБИ ОПЛАТИ</h2>
        <div>
          <ul className={styles.ul}>
            <li>Миттєва оплата через систему online-платіж</li>
            <li>Переказ коштів на карту (номер карти повідомляємо після обробки вашого замовлення та уточнення деталей)</li>
            <li>Післяплата – оплата товару у відділенні НОВОЇ ПОШТИ (комісію за переказ коштів сплачує відправник)</li>
          </ul>
        </div>
        <div className={styles.block}>
          <img className={styles.img_mark} src="./img/mark_attetion.png" alt=""/>
          Увага! <br />
          УВАГА! При оплаті на карту ми відправляємо товар тільки після надходження коштів на наш рахунок. <br />
          Якщо протягом 3-х робочих днів Ви не оплатили замовлення, воно буде розформоване.
        </div>

        <div className={styles.block}>
          <img className={styles.img_mark} src="./img/mark_attetion.png" alt=""/>
          Увага! <br />
          Замовлення вартістю до 300 грн. будуть відправлені тільки з 100% передплатою! <br />
          Таким чином магазин компенсує транспортні витрати у разі відмови від отримання замовлення!
        </div>

        <div className={styles.block}>
          <img className={styles.img_mark} src="./img/mark_attetion.png" alt=""/>
          Увага! <br />
          Доставку Укрпоштою здійснюємо при повній передплаті замовлення.
        </div>
      </div>
    </>
  );
}

export default PaymentMethods