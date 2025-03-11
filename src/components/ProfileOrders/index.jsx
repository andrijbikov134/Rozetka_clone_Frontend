import { useEffect, useState } from "react";
import styles from "./ProfileOrders.module.css"

const ProfileOrders = ({ localhost, user_id }) => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${localhost}/index.php?action=getOrdersByUserId`, {
          method: "POST",
          header: { "Content-Type": "application/json" },
          body: JSON.stringify({user_id: user_id})
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

    fetchOrders();
  }, [localhost]);

  const colors = 
  {
    inprocessing: 'yellow',
    sent: 'green',
    received: 'violet',
    cancelled: 'red' 
  }

  const status_order_ua = 
  {
    inprocessing: 'В обробці',
    sent: 'Відправлено',
    received: 'Отримано',
    cancelled: 'Скасовано' 
  }

  // Функція для розгортання деталей замовлення
  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className={styles.orders_container}>
      <h2>Мої замовлення</h2>

      {orders.length === 0 ? (
        <p>Немає замовлень</p>
      ) : (
        <table className={styles.orders_table}>
          <thead>
            <tr>
              <th>Номер замовлення</th>
              <th>Дата</th>
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
                <tr key={order.order_id} className={styles.order_row} onClick={() => toggleOrderDetails(order.order_id)}>
                  <td>{order.order_id}</td>
                  <td>{new Date(order.date_order).toLocaleDateString()}</td>
                  <td>{order.totalQuantity}</td>
                  <td>{order.totalPrice.toFixed(2)} грн.</td>
                  <td><span className={styles[colors[order.status_order]] + " " + styles.status_order}>{status_order_ua[order.status_order]}</span></td>
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

export default ProfileOrders;


