import React, { useContext, useEffect, useId, useState } from 'react';
import styles from "./Cart.module.css"
import CartProductRow from '../CartProductRow';
import { useNavigate } from 'react-router-dom';


const Cart = (props) => {

  const navigate = useNavigate();

  const [totalSum, setTotalSum] = useState(0);

  const [cartProducts, setCartProducts] = useState([]);

  const [foundProduct, setFoundProduct] = useState([]);

  const [foundColor, setFoundColor] = useState([]);

  function getProductFromDB(id)
  {

    let url = `${props.localhost}/index.php?action=getProductById&id=${id}`;
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
    .then(response => {
      let newArr = foundProduct.map((product) => product);
      newArr.push(response[0]);
      setFoundProduct(newArr);
    })
  }

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

  const createOrder = () =>
  {
    let url = `${props.localhost}/index.php?action=createOrder`;
      fetch(url, {
        method: 'POST',
        header: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(cartProducts), 
      })
      .then(response =>
        response
        );
  }

  const handlerOnClickGoToPayment = () =>
  {
    let paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    if(paymentMethod == 'online')
    {
      navigate('/paymentcard');
    }
    else
    {
      createOrder();
      navigate('/orderaccepted');
    }
  }

  const handlerOnClickLabelPayment = (event) =>
  {
    event.target.closest('div').querySelector('input').checked = true;
  }

  useEffect(() => {
    loadProductsFromLocalStorage();
  }, []);
  
  useEffect(() => {
    saveToLocalStorage();
    updateTotalSum();
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
                    <CartProductRow product={item.product} size={item.size} quantity={item.quantity} color={item.color} handlerOnClickDelete={handlerOnClickDelete} localhostFrontend={props.localhostFrontend} />
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
                  <input type="radio" name="delivery" id="" defaultChecked='true'/>
                  <label for="">Самовивіз з наших магазинів</label>
                </div>
                <div className={styles.delivery_method_select}>
                  <select name="" id="">
                    <option value="">м. Київ, вул. Хрещатик, 300, ТРЦ "Ocean" з 10:00 до 22:00</option>
                    <option value=""> м. Львів, Проспект Свободи, 300, ТРЦ "Ocean" з 10:00 до 22:00</option>
                    <option value="">м. Харків, вул. Сумська, 300, ТРЦ "Ocean" з 10:00 до 22:00</option>
                  </select>
                </div>
              </div>
              <div className={styles.delivery_method_container}>
                <div className={styles.delivery_method_header}>
                  <input type="radio" name="delivery" id=""/>
                  <label for="">Самовивіз з УКРПОШТИ</label>
                </div>
                <div className={styles.delivery_method_address_container}>
                  <input className={styles.delivery_method_address_index} type="text" placeholder='Індекс відділення'/>
                  <input className={styles.delivery_method_address} type="text" placeholder='Повна адреса відділення'/>
                </div>
              </div>
              <div className={styles.delivery_method_container}>
                <div className={styles.delivery_method_header}>
                  <input type="radio" name="delivery" id=""/>
                  <label for="">Самовивіз з НОВОЇ ПОШТИ</label>
                </div>
                <div className={styles.delivery_method_address_container}>
                  <input className={styles.delivery_method_address_index} type="text" placeholder='Номер відділення'/>
                  <input className={styles.delivery_method_address} type="text" placeholder='Назва міста або селища'/>
                </div>
              </div> 
            </div>
                    
          {/* //////////////////////////////////////////////////////////////////////////////////////////// */}
            <h3 className={styles.pay_order}>Оплата</h3>
            <div className={styles.payment_container}>
              <div className={styles.delivery_method_container}>
                <div className={styles.delivery_method_header}>
                  <input type="radio" name="payment" id="" defaultChecked='true' value="cash"/>
                  <label for="" onClick={handlerOnClickLabelPayment}>Оплата під час отримання товару</label>
                </div>
              </div>
              <div className={styles.delivery_method_container}>
                <div className={styles.delivery_method_header}>
                  <input type="radio" name="payment" id="" value="online"/>
                  <label for="" onClick={handlerOnClickLabelPayment}>Оплатити карткою</label>
                </div>
              </div>
            </div>

          {/* //////////////////////////////////////////////////////////////////////////////////////////// */}
            <h3 className={styles.recipient_order}>Отримувач</h3>
            <div className={styles.recipient_container}>
              <div className={styles.recipient_ceil}>
                <div>Ім'я</div>
                <input type="text"/>
              </div>
              <div className={styles.recipient_ceil}>
                <div>Мобільний телефон</div>
                <input type="text" placeholder='+38'/>
              </div>
              <div className={styles.recipient_ceil}>
                <div htmlFor="">Прізвище</div>
                <input type="text"/>
              </div>
              <div className={styles.recipient_ceil}>
                <div>По-батькові</div>
                <input type="text"/>  
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
