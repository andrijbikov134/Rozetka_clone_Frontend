import React from 'react';
import styles from './PaymentCard.module.css';
import { useNavigate } from 'react-router-dom';

const PaymentCard = () => {
  
  const navigate = useNavigate();

  const handlerOnClickPay = () =>
  {
    navigate('/orderaccepted');
  }
  
  return (
    <>
    <div className={styles.main_container}>
      <div className={styles.card_container}>
          <div>Номер картки</div>
          <input className={styles.card_number} type="text" placeholder='0000 0000 0000 0000'  maxLength={16}/>
          <div className={styles.titles_container}>
            <div>Дійсна до</div>
            <div>CVV</div>
          </div>
          <div className={styles.date_cvv_container}>
            <div className={styles.date_container}>
              <input className={styles.card_month} type="text" placeholder='00'  maxLength={2}/>
              <div>/</div>
              <input className={styles.card_year} type="text" placeholder='00'  maxLength={2}/>
            </div>
            <div className={styles.cvv_container}>
              <input className={styles.card_cvv} type="text" placeholder='000' maxLength={3}/>
            </div>
          </div>
      </div>
      <div className={styles.btn_submit} onClick={handlerOnClickPay}>Оплатити</div>
    </div>
      
      
    </>
  );
}

export default PaymentCard;
