import {useEffect, useState} from 'react';
import styles from './OrderAccepted.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderAccepted = (props) => {

  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState({
    products: JSON.parse(localStorage.getItem('order_petrushka_style')),
    user: location.state.user,
    payment_method: location.state.paymentMethod, 
    delivery_type: location.state.delivery_type, 
    recipient: location.state.recipient, 
    delivery: location.state.delivery
  });

  const [orderId, setOrderId] = useState(0);

  const handlerOnClickGoHomePage = () =>
  {
    navigate('/');
  }

  const saveOrderToDB = () =>
  {
    let array = JSON.parse(localStorage.getItem('order_petrushka_style')) || [];
    if(array.length != 0)
    {
      fetch(`${props.localhost}/index.php?action=createOrder`, {
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(response => setOrderId(response)
      );
    }
    
  }

  useEffect(() => {
    
    saveOrderToDB();
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
          <div className={styles.grid_ceil}>{orderId}</div>
          <div className={styles.grid_ceil}>Дата:</div>
          <div className={styles.grid_ceil}>{currentDate}</div>
        </div>
        <div className={styles.btn_home} onClick={handlerOnClickGoHomePage}>Перейти на головну</div>
      </div>
    </>
  );
}

export default OrderAccepted;
