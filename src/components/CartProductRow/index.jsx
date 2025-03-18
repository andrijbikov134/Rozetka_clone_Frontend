import { useEffect, useId, useState } from 'react';
import styles from "./CartProductRow.module.css"


const CartProductRow = (props) => {
  
  const [quantity, setQuantity] = useState(props.quantity);

  const inputQuantityId = useId();
  
  const handlerOnClickDelete = () =>
  {
    props.handlerOnClickDelete(props.product.id, props.size.id);
  }

  const handlerOnChangeQuantity = (e) =>
  {
    let newQuantity = Number(e.target.value);
    if(newQuantity >= 1)
    {
      setQuantity(newQuantity);
    }
    else if(e.target.value == '')
    {
      setQuantity("");
    }
  }

  const hanlderFocusLeave = (e) =>
  {
    if(e.target.id != inputQuantityId && document.getElementById(inputQuantityId).value == "")
    {
      setQuantity(1);
    }
  }

  const handlerOnKeyUp = (e) =>
  {
    if(e.code == 'Enter' && e.target.value == "")
    {
      setQuantity(1);
    }
  }

  const handlerOnClickQuantityPlus = () =>
  {
    setQuantity(quantity + 1);
  }

  const handlerOnClickQuantityMinus = () =>
  {
    if(quantity > 1)
    {
      setQuantity(quantity - 1);
    }
  }

  const updateQuantityInCart = () =>
  {
    props.updateQuantityInCart(props.product, props.size, quantity);
  }

  useEffect(() => {
    document.addEventListener('click', hanlderFocusLeave);
  }, []);

  useEffect(() => {
    updateQuantityInCart();
  }, [quantity]);

  return (
      <>
        <div className={styles.cell_container}>
          <div className={styles.img_container}>
            <img className={styles.img_product} src={props.googleBucketUrl + props.product.pictures_path} alt="" />
          </div>
          <div className={styles.product_description}>
            <div className={styles.title}>{props.product.title}</div>
            <div className={styles.container_flex_characteristics}>
              <div>Розмір:</div>
              <div>{props.size.title}</div>
            </div>
            <div className={styles.container_flex_characteristics}>
              <div>Колір:</div>
              <div>{props.color}</div>
            </div>
            <div className={styles.container_flex_characteristics}>
              <div>Артикул:</div>
              <div>{props.product.part_number}</div>
            </div>
          </div>
        </div>
        <div className={styles.cell_container}>
          <div className={styles.price}>{props.product.price.toLocaleString()} грн.</div>
        </div>
        <div className={styles.cell_container}>
          <div className={styles.btn_quantity} onClick={handlerOnClickQuantityMinus}>-</div>
          <input id={inputQuantityId} className={styles.quantity} value={quantity}
          onChange={handlerOnChangeQuantity} onKeyUp={handlerOnKeyUp}/>
          <div className={styles.btn_quantity} onClick={handlerOnClickQuantityPlus}>+</div>
        </div>
        <div className={styles.cell_container}>
          <div className={styles.total_sum}>{(props.quantity * props.product.price).toLocaleString()} грн.</div>
        </div>
        <div className={styles.btn_delete} >
          <img className={styles.img_delete} src={props.localhostFrontend + '/img/delete.png'} alt="" onClick={handlerOnClickDelete}/>
        </div>
      </>
  );
}

export default CartProductRow;
