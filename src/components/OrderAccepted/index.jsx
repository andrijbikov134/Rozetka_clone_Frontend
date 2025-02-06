import {useEffect} from 'react';
import styles from './OrderAccepted.module.css';
import { useNavigate } from 'react-router-dom';

const OrderAccepted = (props) => {

  const navigate = useNavigate();

  const handlerOnClickGoHomePage = () =>
  {
    navigate('/');
  }

  useEffect(() => {
    localStorage.setItem('order_petrushka_style', JSON.stringify([]));
    props.updateCart();
    return () => {
      
    };
  }, []);

  let date = new Date();
  let currentDate = date.toLocaleDateString();

  return (
    <>
      <div className={styles.main_container}>
        <img className={styles.img} src={props.localhostFrontend + "/img/OK.png"} alt="" />
        <h1>Вітаємо!</h1>
        <h3>Ваше замовлення успішно прийнято.</h3>
        <div className={styles.order_container_info}>
          <div className={styles.grid_ceil}>Замовлення №:</div>
          <div className={styles.grid_ceil}>1</div>
          <div className={styles.grid_ceil}>Дата:</div>
          <div className={styles.grid_ceil}>{currentDate}</div>
        </div>
        <div className={styles.btn_home} onClick={handlerOnClickGoHomePage}>Перейти на головну</div>
      </div>
    </>
  );
}

export default OrderAccepted;
