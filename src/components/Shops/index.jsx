import styles from "./Shops.module.css";

const Shops = () =>
{


  return(
    <>
      <div className={styles.main_container}>
        <h2>Магазини</h2>
        <h3>м. Київ, вул. Хрещатик, 300, ТРЦ "Ocean"</h3>
        <div>Магазин «NoFollowingVibe»</div>
        <div>З 10:00 до 22:00</div>

        <h3>м. Львів, проспект Свободи, 300, ТРЦ "Ocean"</h3>
        <div>Магазин «NoFollowingVibe»</div>
        <div>З 10:00 до 22:00</div>

        <h3>м. Харків, вул. Сумська, 300, ТРЦ "Ocean"</h3>
        <div>Магазин «NoFollowingVibe»</div>
        <div>З 10:00 до 22:00</div>
      </div>
    </>
  );
}

export default Shops