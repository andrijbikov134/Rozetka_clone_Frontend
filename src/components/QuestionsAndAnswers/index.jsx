import styles from "./QuestionsAndAnswers.module.css";
import { Link } from "react-router-dom";

const QuestionsAndAnswers = () =>
{
  return(
    <>
      <div className={styles.main_container}>
        <h2>ПИТАННЯ ТА ВІДПОВІДІ (FAQ)</h2>
        <h3>
          <img className={styles.img_mark} src="./img/circle.png" alt=""/> 
          Які способи і терміни доставки товару?
        </h3>
        <div>
        У межах України замовлення доставляємо партнером-перевізником Укрпошта або Нова Пошта. <br />
        Якщо Вам потрібна доставка кур'єром, напишіть, будь-ласка, про це у ПРИМІТКАХ до замовлення.
        </div>
        <br />
        <h3>
          <img className={styles.img_mark} src="./img/circle.png" alt=""/> 
          Яка сума мінімального замовлення для безкоштовної доставки?
        </h3>
        <div>Доставка безкоштовна в межах України за умови, якщо сума замовлення - понад 2 999 грн.</div>
        <br />
      </div>
    </>
  );
}

export default QuestionsAndAnswers;