import React, { useContext, useEffect, useId, useState } from 'react';
import styles from "./Cart.module.css"
import CartProductRow from '../CartProductRow';
import { useNavigate } from 'react-router-dom';


const Cart = (props) => {

  const navigate = useNavigate();

  const [totalSum, setTotalSum] = useState(0);
  
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user_petrushka_style')) || JSON.parse(sessionStorage.getItem('user_petrushka_style')));

  const [phoneNumber, setPhoneNumber] = useState(currentUser == null ? '+38' : currentUser.phone);

  const [firstName, setFirstName] = useState(currentUser == null ? '' : currentUser.first_name);

  const [lastName, setLastName] = useState(currentUser == null ? '' : currentUser.last_name);

  const [patronymic, setPatronymic] = useState('');
  
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);

  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

  const [index, setIndex] = useState('');

  const [address, setAddress] = useState('');

  const [indexUkr, setIndexUkr] = useState('');

  const [addressUkr, setAddressUkr] = useState('');

  const [isIndexUkrValid, setIsIndexUkrValid] = useState(true);

  const [isAddressUkrValid, setIsAddressUkrValid] = useState(true);

  const [indexNova, setIndexNova] = useState('');

  const [addressNova, setAddressNova] = useState('');

  const [isIndexNovaValid, setIsIndexNovaValid] = useState(true);

  const [isAddressNovaValid, setIsAddressNovaValid] = useState(true);

  const [deliveryType, setDeliveryType] = useState('');


  const [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem('order_petrushka_style')) || []);

  const [foundColor, setFoundColor] = useState([]);

  function getColorFromDB(id)
    {
      let url = `${props.localhost}/index.php?action=getColorById&id=${id}`;
      fetch(url, {
        method: 'POST',
        header: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({action: 1})
      })
      .then(response =>
        response.json()
        )
      .then(response => 
      {
        let newArr = foundColor.map((color) => color);
        newArr.push(response[0]);
        setFoundColor(newArr);
      });
 
    }

  const loadProductsFromLocalStorage = () =>
  {
    let array = JSON.parse(localStorage.getItem('order_petrushka_style')) || [];
    setCartProducts(array);
  }

  const saveToLocalStorage = () =>
  {
    let json = JSON.stringify(cartProducts);
    localStorage.setItem('order_petrushka_style', json);
  }

  const updateTotalSum = () =>
  {
    let sum = cartProducts.reduce((accumulator, {product, quantity}) => accumulator + (product.price * quantity),
    0);
    setTotalSum(sum);
  }

  const handlerOnClickDelete = (product_id, size_id) =>
  {
    props.handlerOnClickDelete(product_id, size_id);
    let newArr = cartProducts.filter((item) =>
      {
        return !(item.product.id == product_id && item.size.id == size_id);
      });
    setCartProducts(newArr);
  }

  const loadColor = () =>
  {
    cartProducts.map((item) =>
    {
      getColorFromDB(item.product.color_id)
    })
  }

  // const createOrder = () =>
  // {
  //   let url = `${props.localhost}/index.php?action=createOrder`;
  //     fetch(url, {
  //       method: 'POST',
  //       header: {
  //         'Content-Type': 'application/json', 
  //       },
  //       body: JSON.stringify(cartProducts), 
  //     })
  //     .then(response =>
  //       response
  //       );
  // }

  const validateFirstName = () =>
  {
    if(firstName == "" || firstName == undefined)
    {
      setIsFirstNameValid(false);
      return false;
    }
    return true;
  }

  const validatePhoneNumber = () =>
  {
    let pattern = new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$');
    if(!pattern.test(phoneNumber))
    {
      setIsPhoneNumberValid(false);
      return false;
    }
    return true;
  }

  const validateDelivery = () =>
  {
    if(deliveryType != '' && address != '')
    {
      return true;
    }
    else
    {
      return false;
    }
    
  }

  const loadAddressOnLoadPage = () =>
  {
    let optionValue = document.querySelector(`select[name="delivery"] option:checked`) == undefined ? "" : document.querySelector(`select[name="delivery"] option:checked`).value;
    setDeliveryType('self_pickup');
    setAddress(optionValue);
  }

  const handlerOnClickGoToPayment = () =>
  {
    let paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    let firstNameValid = validateFirstName();
    let phoneNumberValid = validatePhoneNumber();
    let deliveryValid = validateDelivery();

    if(phoneNumberValid && firstNameValid && deliveryValid)
    {
      if(paymentMethod == 'online')
      {
        navigate('/paymentcard', {state:{user: currentUser, paymentMethod: paymentMethod, delivery_type: deliveryType, recipient: {phoneNumber: phoneNumber, firstName: firstName, lastName: lastName, patronymic: patronymic}, delivery:{index: index, address: address} }});
      }
      else
      {
        //createOrder();
        navigate('/orderaccepted', {state:{user: currentUser, paymentMethod: paymentMethod, delivery_type: deliveryType, recipient: {phoneNumber: phoneNumber, firstName: firstName, lastName: lastName, patronymic: patronymic}, delivery:{index: index, address: address} }});
      }
    }
  }

  const handlerOnClickLabelPayment = (event) =>
  {
    event.target.closest('div').querySelector('input').checked = true;
  }

  const handlerOnChangeIndexUkr = (event) =>
  {
    setIsIndexUkrValid(true);
    setIndex(event.target.value);
    setIndexUkr(event.target.value);
  }

  const handlerOnChangeAddressUkr = (event) =>
  {
    setIsAddressUkrValid(true);
    setAddress(event.target.value);
    setAddressUkr(event.target.value);
  }

  const handlerOnChangeIndexNova = (event) =>
  {
    setIsIndexNovaValid(true);
    setIndex(event.target.value);
    setIndexNova(event.target.value);
  }

  const handlerOnChangeAddressNova = (event) =>
  {
    setIsAddressNovaValid(true);
    setAddress(event.target.value);
    setAddressNova(event.target.value);
  }

  const handlerOnChangePhoneNumber = (event) =>
  {
    let pattern = new RegExp('^[+]*[0-9]*$');
    if(pattern.test(event.target.value))
    {
      setIsPhoneNumberValid(true);
      setPhoneNumber(event.target.value);
    }
  }

  const handlerOnChangeFirstName = (event) =>
  {
    let pattern = new RegExp('^[a-zA-Z]*$');
    if(pattern.test(event.target.value))
    {
      setIsFirstNameValid(true);
      setFirstName(event.target.value);
    }
  }

  const handlerOnChangeSelect = (e) =>
  {
    setAddress(e.target.selectedOptions[0].value);
  }

  const handlerOnChangeDeliveryRadio = (e) =>
  {
    setIsAddressNovaValid(true);
    setIsAddressUkrValid(true);
    setIsIndexNovaValid(true);
    setIsIndexUkrValid(true);

    setAddressNova('');
    setIndexNova('');
    setAddressUkr('');
    setIndexUkr('');

    if(e.target.value == 'self_pickup')
    {
      setDeliveryType('self_pickup');
      let optionValue = document.querySelector(`select[name="delivery"] option:checked`).value;
      setIndex("");
      setAddress(optionValue);
    }
    else if(e.target.value == 'ukr_poshta')
    {
      setDeliveryType('ukr_poshta');
      if(indexUkr == "" && addressUkr == "")
        {
          setIsIndexUkrValid(false);
          setIsAddressUkrValid(false);
        }
        else if(indexUkr == "" && addressUkr != "")
        {
          setIsIndexUkrValid(false);
        }
        else if(indexUkr != "" && addressUkr == "")
        {
          setIsAddressUkrValid(false);
        }
        setIndex(indexUkr);
        setAddress(addressUkr);
    }
    else
    {
      setDeliveryType('nova_poshta');
      if(indexNova == "" && addressNova == "")
      {
        setIsIndexNovaValid(false);
        setIsAddressNovaValid(false);
      }
      else if(indexNova == "" && addressNova != "")
      {
        setIsIndexNovaValid(false);
      }
      else if(indexNova != "" && addressNova == "")
      {
        setIsAddressNovaValid(false);
      }
      setIndex(indexNova);
      setAddress(addressNova);
    }
  }

  const handlerOnChangeLastName = (event) =>
  {
    let pattern = new RegExp('^[a-zA-z]*$');
    if(pattern.test(event.target.value))
    {
      setLastName(event.target.value);
    }
  }

  const handlerOnChangePatronymic = (event) =>
  {
    let pattern = new RegExp('^[a-zA-z]*$');
    if(pattern.test(event.target.value))
    {
      setPatronymic(event.target.value);
    }
  }

  const updateQuantityInCart = (product, size, newQuantity) =>
  {
    let newCart = cartProducts.map((item) =>
    {
      if(item.product.id == product.id && item.size.id == size.id)
      {
        let newItem = {...item};
        newItem.quantity = newQuantity;
        return newItem;
      }
      else{
        return item;
      }
    });
    setCartProducts(newCart);
  }

  useEffect(() => {
    loadProductsFromLocalStorage();
    loadAddressOnLoadPage();
  }, []);
  
  useEffect(() => {
    saveToLocalStorage();
    updateTotalSum();
    props.updateCart();
    loadColor();
  }, [cartProducts]);

  useEffect(() => {
  }, [foundColor]);

  
  return (
      <>
      <div className={styles.main_container}>
        <h2 className={styles.h2}>КОШИК</h2>
        <div className={styles.table_header}>
        </div>
        { cartProducts.length == 0 ? <h3>Ваш кошик порожній.</h3> : 
          <>
          <div className={styles.grid_container}>
            <div className={styles.grid_header}>Товар</div>
            <div className={styles.grid_header}>Ціна</div>
            <div className={styles.grid_header}>Кількість</div>
            <div className={styles.grid_header}>Сума</div>
            <div></div>
            <div className={styles.grid_border_solid}></div>
            {
              cartProducts.map((item) =>
              {
                return(
                  <>
                    <CartProductRow product={item.product} size={item.size} quantity={item.quantity} color={item.color} handlerOnClickDelete={handlerOnClickDelete} updateQuantityInCart={updateQuantityInCart} localhostFrontend={props.localhostFrontend} />
                    <div className={styles.grid_border_row}></div>
                  </>
              )}
              )
            }
          </div>

          {/* //////////////////////////////////////////////////////////////////////////////////////////// */}
          <div className={styles.description_order_container}>
            <h3 className={styles.h2}>Доставка</h3>
            <div className={styles.delivery_container}>
              <div className={styles.delivery_method_container}>
                <div className={styles.delivery_method_header}>
                  <input type="radio" name="delivery" id="self_pickup" value='self_pickup' onChange={handlerOnChangeDeliveryRadio} defaultChecked='true'/>
                  <label for="">Самовивіз з наших магазинів</label>
                </div>
                <div className={styles.delivery_method_select}>
                  <select name="delivery" id="" onChange={handlerOnChangeSelect}>
                    <option value="м. Київ, вул. Хрещатик, 300, ТРЦ 'Ocean'">м. Київ, вул. Хрещатик, 300, ТРЦ "Ocean" з 10:00 до 22:00</option>
                    <option value="м. Львів, проспект Свободи, 300, ТРЦ 'Ocean'"> м. Львів, проспект Свободи, 300, ТРЦ "Ocean" з 10:00 до 22:00</option>
                    <option value="м. Харків, вул. Сумська, 300, ТРЦ 'Ocean'">м. Харків, вул. Сумська, 300, ТРЦ "Ocean" з 10:00 до 22:00</option>
                  </select>
                </div>
              </div>
              <div className={styles.delivery_method_container}>
                <div className={styles.delivery_method_header}>
                  <input type="radio" name="delivery" id="" value='ukr_poshta' onChange={handlerOnChangeDeliveryRadio} />
                  <label for="" >Самовивіз з УКРПОШТИ</label>
                </div>
                <div className={styles.delivery_method_address_container}>
                  <input className={styles.delivery_method_address_index  + " " + (isIndexUkrValid ? "" : styles.error_border)} value={indexUkr} onChange={handlerOnChangeIndexUkr} type="text" placeholder='Індекс відділення'/>
                  <input className={styles.delivery_method_address  + " " + (isAddressUkrValid ? "" : styles.error_border)} value={addressUkr} onChange={handlerOnChangeAddressUkr} type="text" placeholder='Повна адреса відділення'/>
                  <div className={styles.error_message + " " + (isIndexUkrValid && isAddressUkrValid ? styles.hidden :"" )} name="error_message" >Заповніть поле!</div>
                </div>
              </div>
              <div className={styles.delivery_method_container}>
                <div className={styles.delivery_method_header}>
                  <input type="radio" name="delivery" id="nova_poshta" value='nova_poshta' onChange={handlerOnChangeDeliveryRadio}/>
                  <label for="" >Самовивіз з НОВОЇ ПОШТИ</label>
                </div>
                <div className={styles.delivery_method_address_container}>
                  <input className={styles.delivery_method_address_index + " " + (isIndexNovaValid ? "" : styles.error_border)}  value={indexNova} onChange={handlerOnChangeIndexNova} type="text" placeholder='Номер відділення'/>
                  <input className={styles.delivery_method_address  + " " + (isAddressNovaValid ? "" : styles.error_border)} type="text"  value={addressNova} onChange={handlerOnChangeAddressNova} placeholder='Назва міста або селища'/>
                  <div className={styles.error_message + " " + (isIndexNovaValid && isAddressNovaValid ? styles.hidden :"" )} name="error_message">Заповніть поле!</div>
                </div>
              </div> 
            </div>
                    
          {/* //////////////////////////////////////////////////////////////////////////////////////////// */}
            <h3 className={styles.pay_order}>Оплата</h3>
            <div className={styles.payment_container}>
              <div className={styles.delivery_method_container}>
                <div className={styles.delivery_method_header}>
                  <input type="radio" name="payment" id="" value="online" defaultChecked='true'/>
                  <label for="" onClick={handlerOnClickLabelPayment}>Оплатити карткою</label>
                </div>
              </div>
              <div className={styles.delivery_method_container + " " + (currentUser == null ? styles.hidden : '')}>
                <div className={styles.delivery_method_header}>
                  <input type="radio" name="payment" id=""  value="cash" />
                  <label for="" onClick={handlerOnClickLabelPayment}>Оплата під час отримання товару</label>
                </div>
              </div>
            </div>

          {/* //////////////////////////////////////////////////////////////////////////////////////////// */}
            <h3 className={styles.recipient_order}>Отримувач</h3>
            <div className={styles.recipient_container}>
              <div className={styles.recipient_ceil}>
                <div>Ім'я</div>
                <input type="text" value={firstName} onChange={handlerOnChangeFirstName} 
                className={isFirstNameValid ? "" : styles.error_border}/>
                <div className={styles.error_message + " " + (isFirstNameValid ? styles.hidden : "")}>Заповніть поле!</div>
              </div>
              <div className={styles.recipient_ceil}>
                <div>Мобільний телефон</div>
                <input type="phone" placeholder='+38' value={phoneNumber} onChange={handlerOnChangePhoneNumber}
                className={isPhoneNumberValid ? "" : styles.error_border}/>
                <div className={styles.error_message + " " + (isPhoneNumberValid ? styles.hidden : "")}>Некоректний номер!</div>
              </div>
              <div className={styles.recipient_ceil}>
                <div htmlFor="">Прізвище</div>
                <input type="text" value={lastName} onChange={handlerOnChangeLastName}/>
              </div>
              <div className={styles.recipient_ceil}>
                <div>По-батькові</div>
                <input type="text" value={patronymic} onChange={handlerOnChangePatronymic}/>  
              </div>
            </div>
          </div>

          <div className={styles.sum_submit}>
              <div>Сума замовлення: {totalSum.toLocaleString()} грн.</div>
              <div className={styles.btn_confirm_order} onClick={handlerOnClickGoToPayment}>Підтвердити замовлення</div>
          </div>
          </>
        }
        
      </div>
      </>
  );
}

export default Cart;
