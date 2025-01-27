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
          Як отримати подарунковий сертифікат та яким чином їм скористатися?
        </h3>
        <div>
          Подарунковий сертифікат можна отримати <Link to='/giftcertificates'><span className={styles.link_gift_certificate}>тут</span></Link> 
        </div>
        <br />

        <h3>
          <img className={styles.img_mark} src="./img/circle.png" alt=""/> 
          Яка сума мінімального замовлення для безкоштовної доставки?
        </h3>
        <div>Доставка безкоштовна в межах України за умови, якщо сума замовлення - понад 2 999 грн.</div>
        <br />

        <h3>
          <img className={styles.img_mark} src="./img/circle.png" alt=""/> 
          Чи діє накопичувальна програма?
        </h3>
        <div>
          Так, з системою знижок ви можете ознайомися нижче. <br /> <br />
          <img className={styles.img_mark_star} src="./img/mark_star.png" alt=""/> 
        При накопиченні суми замовлень від 5 000 грн. - знижка 1% <br />
        <img className={styles.img_mark_star} src="./img/mark_star.png" alt=""/> 
        При накопиченні суми замовлень від 10 000 грн. - знижка 3% <br />
        <img className={styles.img_mark_star} src="./img/mark_star.png" alt=""/> 
        При накопиченні суми замовлень від 25 000 грн. - знижка 7% <br />
        <img className={styles.img_mark_star} src="./img/mark_star.png" alt=""/> 
        При накопиченні суми замовлень від 20 000 грн. - знижка 10% <br />
        </div>
        <br />
      </div>
    </>
  );
}

export default QuestionsAndAnswers;