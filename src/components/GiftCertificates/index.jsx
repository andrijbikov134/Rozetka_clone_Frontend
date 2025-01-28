import styles from "./GiftCertificates.module.css";

const GiftCertificates = () =>
{
  return(
    <>
      <div className={styles.main_container}>
        <h2>ПОДАРУНКОВІ СЕРТИФІКАТИ</h2>
        <div>Для подарунка обирайте найкраще!</div>
        <h3>Обирайте номінал картки:</h3>
        <div className={styles.buttons_container}>
          <button>500 грн.</button>
          <button>1 000 грн.</button>
          <button>2 000 грн.</button>
          <button>5 000 грн.</button>
        </div>
        <button className={styles.button_buy}>Купити</button>
      </div>
    </>
  );
}

export default GiftCertificates