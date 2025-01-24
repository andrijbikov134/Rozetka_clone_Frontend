import styles from "./QuestionsAndAnswers.module.css";

const QuestionsAndAnswers = () =>
{
  return(
    <>
      <div className={styles.main_container}>
        <h2>ПИТАННЯ ТА ВІДПОВІДІ</h2>
        <h3>Які способи і терміни доставки товару?</h3>
        <h3>Як отримати подарунковий сертифікат та яким чином їм скористатися?</h3>
        <h3>Чи діє накопичувальна програма?</h3>
        <h3>Яка сума мінімального замовлення для безкоштовної доставки?</h3>
      </div>
    </>
  );
}

export default QuestionsAndAnswers