import styles from "./Contacts.module.css";

const Contacts = () => 
{

  return(
    <>
      <div className={styles.main_container}>
        <h1>Контактна інформація</h1>
        <h3>Юридична адреса</h3>
        <div>
          ТОВ "Petrushka Style"<br />
          Поштова адреса: 00001, м. Київ, вул. Хрещатик, буд. 999 <br />
          Місцезнаходження: 00001, м. Київ, вул. Хрещатик, буд. 300 <br /><br />
          support@petrushka_style.com.ua <br />
          +38-067-123-45-67 <br /><br />
        </div>
      </div>
    </>
  );
}
export default Contacts;