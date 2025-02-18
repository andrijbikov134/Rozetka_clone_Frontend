import React, { useState } from 'react';
import styles from './PaymentCard.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentCard = () => {
  
  const navigate = useNavigate();
  const location = useLocation();

  const [cardNumber, setCardNumber] = useState("");

  const [cardMonth, setCardMonth] = useState("");

  const [cardYear, setCardYear] = useState("");

  const [cardCvv, setCardCvv] = useState("");

  const [isValidCardNumber ,setIsValidCardNumber] = useState(true);

  const [isValidCardMonth ,setIsValidCardMonth] = useState(true);

  const [isValidCardYear ,setIsValidCardYear] = useState(true);

  const [isValidCardCvv ,setIsValidCardCvv] = useState(true);

  const [isPaymentValid, setIsPaymentValid] = useState(true)


  const handlerOnChangeCardNumber = (event) =>
  {
    let pattern = new RegExp('^[0-9]{0,1}[0-9 ]{0,18}$');
    if(pattern.test(event.target.value))
    {
      if((event.target.value.length + 1) % 5 == 0 && event.target.value.length < 19 && event.target.value.length > 0 && event.nativeEvent.inputType != 'deleteContentBackward') 
      {
        setCardNumber(event.target.value + " ");
      }
      else
      {
        setCardNumber(event.target.value);
      }
      setIsValidCardNumber(true);
    }
  }

  const handlerOnChangeCardMonth = (event) =>
  {
    let pattern1 = new RegExp('^[0][1-9]{0,1}$');
    let pattern2 = new RegExp('^[1][0-2]{0,1}$');
    if(pattern1.test(event.target.value) || pattern2.test(event.target.value) || event.target.value == "")
    {
      setIsValidCardMonth(true);
      setCardMonth(event.target.value);
    }
  }

  const handlerOnChangeCardYear = (event) =>
  {
    let pattern = new RegExp('^[0-9]{0,2}$');
    if(pattern.test(event.target.value))
    {
      setIsValidCardYear(true);
      setCardYear(event.target.value);
    }
  }

  const handlerOnChangeCardCvv = (event) =>
  {
    let pattern = new RegExp('^[0-9]{0,3}$');
    if(pattern.test(event.target.value))
    {
      setIsValidCardCvv(true);
      setCardCvv(event.target.value);
    }
  }

  const validatePayment = () =>
  {
    let cardNumberTrim = cardNumber.replace(/\s/g, '');
    if(cardNumberTrim.length < 16)
    {
      setIsValidCardNumber(false);
    }
    if(cardMonth.length < 2)
    {
      setIsValidCardMonth(false);
    }
    if(cardYear.length < 2)
    {
      setIsValidCardYear(false);
    }
    if(cardCvv.length < 3)
    {
      setIsValidCardCvv(false);
    }
    if(cardNumberTrim.length == 16 && cardMonth.length == 2 && cardYear.length == 2 && cardCvv.length == 3)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  

  const handlerOnClickPay = () =>
  {
    if(validatePayment())
    {
      navigate('/orderaccepted', {state:{user: location.state.user, paymentMethod: location.state.paymentMethod, delivery_type: location.state.delivery_type, recipient: location.state.recipient, delivery: location.state.delivery}});
    }
  }
  
  return (
    <>
    <div className={styles.main_container}>
      <div className={styles.card_container}>
          <div>Номер картки</div>
          <input className={styles.card_number + " " + (isValidCardNumber ? "" : styles.error)} onChange={handlerOnChangeCardNumber} type="text" placeholder='0000 0000 0000 0000' value={cardNumber}/>
          <div className={styles.titles_container}>
            <div>Дійсна до</div>
            <div>CVV</div>
          </div>
          <div className={styles.date_cvv_container}>
            <div className={styles.date_container}>
              <input className={styles.card_month + " " + (isValidCardMonth ? "" : styles.error)} value={cardMonth} onChange={handlerOnChangeCardMonth} type="text" placeholder='00' />
              <div>/</div>
              <input className={styles.card_year + " " + (isValidCardYear ? "" : styles.error)} value={cardYear} onChange={handlerOnChangeCardYear} type="text" placeholder='00'/>
            </div>
            <div className={styles.cvv_container}>
              <input className={styles.card_cvv + " " + (isValidCardCvv ? "" : styles.error)} value={cardCvv} onChange={handlerOnChangeCardCvv} type="text" placeholder='000'/>
            </div>
          </div>
      </div>
      <div className={styles.btn_submit} onClick={handlerOnClickPay}>Оплатити</div>
    </div>
      
      
    </>
  );
}

export default PaymentCard;
