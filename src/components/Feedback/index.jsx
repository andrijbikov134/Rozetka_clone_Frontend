import styles from './Feedback.module.css'; 

const Feedback = (props) => {

  return (
    <>

        <form className={styles.main_container} action="">
          <div>Товар 1</div>
          <div className={styles.bold}>Оцінка товару</div>
          <div className={styles.stars}>
            <img className={styles.img_star} src="./img/star_empty.png" alt="" />
            <img className={styles.img_star} src="./img/star_empty.png" alt="" />
            <img className={styles.img_star} src="./img/star_empty.png" alt="" />
            <img className={styles.img_star} src="./img/star_empty.png" alt="" />
            <img className={styles.img_star} src="./img/star_empty.png" alt="" />
          </div>
          <textarea className={styles.comment} placeholder='Коментар'></textarea>
          <textarea placeholder='Переваги'></textarea>
          <textarea placeholder='Недоліки'></textarea>
          <input className={styles.button_submit} type='submit' value='Залишити відгук'/>

        </form>

    </>
  );
}

export default Feedback;
