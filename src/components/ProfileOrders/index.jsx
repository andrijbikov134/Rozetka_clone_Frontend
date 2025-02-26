import { useEffect, useState } from "react";
import styles from "./ProfileOrders.module.css"

const ProfileOrders = ({ localhost, user_id }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${localhost}/index.php?action=getOrdersByUserId`, {
          method: "POST",
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

  return (
    <div>
      <div>
        {/* <img className={styles.img_backet} src={props.localhostFrontend + '/img/backet.png'}  alt="" /> */}
        <h2>Мої замовлення</h2>
      </div>

      {orders.length === 0 ? (
        <p>Немає замовлень</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Номер замовлення</th>
              <th>Дата</th>
              <th>Товар</th>
              <th>Кількість</th>
              <th>Сума</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{new Date(order.date_order).toLocaleDateString()}</td>
                <td>{order.product_name}</td>
                <td>{order.quantity}</td>
                <td>{order.total_price.toFixed(2)} грн</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProfileOrders;


