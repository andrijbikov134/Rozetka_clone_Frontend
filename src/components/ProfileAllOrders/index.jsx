import { useEffect, useState } from "react";
import styles from "./ProfileAllOrders.module.css"

const ProfileAllOrders = ({ localhost }) => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [selectedStatusOrder, setSelectedStatusOrder] = useState('');

  const handlerOnChangeStatusOrder = (event) =>
  {
    const orderId = event.target.dataset.id; 
    const newStatusOrder = event.target.selectedOptions[0].value;
    const newColor = event.target.selectedOptions[0].dataset.color;
    event.target.style.backgroundColor = newColor;
    fetch(`${localhost}/index.php?action=updateOrder`, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({order_id: orderId, status_order: newStatusOrder}),
    })
    .then(response =>
      fetchOrders()
      )   
  }

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${localhost}/index.php?action=getOrders`, {
        method: "POST",
        header: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const text = await response.text(); 
      console.log("Отримані дані (текст):", text);

      if (!text.trim()) {
        throw new Error("Сервер повернув пустий JSON");
      }

      const data = JSON.parse(text);
      console.log("Отримані дані (JSON):", data);

      if (data.error) {
        console.error("Помилка сервера:", data.error);
        setOrders([]);
      } else {
        setOrders(Array.isArray(data.orders) ? data.orders : []);
      }
    } catch (error) {
      console.error("Помилка отримання замовлень:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [localhost]);


  // Функція для розгортання деталей замовлення
  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const colors = 
  {
    inprocessing: 'yellow',
    sent: 'green',
    received: 'violet',
    cancelled: 'red' 
  }

  return (
    <div className={styles.orders_container}>
      <h2>Усі замовлення</h2>

      {orders.length === 0 ? (
        <p>Немає замовлень</p>
      ) : (
        <table className={styles.orders_table}>
          <thead>
            <tr>
              <th>Номер замовлення</th>
              <th>Дата</th>
              <th>Отримувач</th>
              <th>Товарів</th>
              <th>Сума</th>
              <th>Статус</th>
              <th>Деталі</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <>
                {/* Головний рядок замовлення */}
                <tr key={order.order_id} className={styles.order_row} >
                  <td onClick={() => toggleOrderDetails(order.order_id)}>{order.order_id}</td>
                  <td onClick={() => toggleOrderDetails(order.order_id)}>{new Date(order.date_order).toLocaleDateString()}</td>
                  <td onClick={() => toggleOrderDetails(order.order_id)}>{order.full_name.trim() + ", тел. " + order.phone}</td>
                  <td onClick={() => toggleOrderDetails(order.order_id)}>{order.totalQuantity}</td>
                  <td onClick={() => toggleOrderDetails(order.order_id)}>{order.totalPrice} грн.</td>
                  <td>
                    {/* <span className={styles.order_done}>Виконано</span> */}
                    {}
                    <select className={styles[colors[order.status_order]]} name="" id="" onChange={handlerOnChangeStatusOrder} data-id={order.order_id}>
                      <option className={styles.yellow} data-color = 'yellow' value="inprocessing" selected={order.status_order == 'inprocessing' ? true : false}>В обробці</option>
                      <option className={styles.green} data-color = 'lightgreen' value="sent" selected={order.status_order == 'sent' ? true : false}>Відправлено</option>
                      <option className={styles.violet} data-color = 'violet' value="received" selected={order.status_order == 'received' ? true : false}>Отримано</option>
                      <option className={styles.red}  data-color = 'red' value="cancelled" selected={order.status_order == 'cancelled' ? true : false}>Скасовано</option>
                    </select>
                  </td>
                  <td className={styles.details_button_td} onClick={() => toggleOrderDetails(order.order_id)}>
                    <button 
                      className={styles.details_button} 
                      onClick={() => toggleOrderDetails(order.order_id)}
                    >
                      {expandedOrder === order.order_id ? "▲" : "▼"}
                    </button>
                  </td>
                </tr>

                {/* Деталі товарів у замовленні (розкриваються при натисканні) */}
                {expandedOrder === order.order_id && (
                  <tr className={styles.order_details}>
                    <td colSpan="5">
                      <table className={styles.products_table}>
                        <thead>
                          <tr>
                            <th>Товар</th>
                            <th>Кількість</th>
                            <th>Ціна</th>
                          </tr>
                        </thead>
                        <tbody>
                          {JSON.parse(order.products).map((product, index) => (
                            <tr key={index}>
                              <td>{product.title}</td>
                              <td>{product.quantity}</td>
                              <td>{product.price} грн</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProfileAllOrders;


