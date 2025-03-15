import React from 'react';
import styles from  './ProfileDirectory.module.css';

const ProfileDirectory = () => {

  return (
    <>
    <div className={styles.main_container}>
      <div className={styles.buttons_container}>
        <button onClick={() => fetchData("getTopProductsQuantity")} className="btn">Бренди</button>
        <button onClick={() => fetchData("getSalesByMonth")} className="btn">Матеріали</button>
        <button onClick={() => fetchData("getSalesByBrand")} className="btn">Країни-виробники</button>
      </div>

    </div>
      
    </>
  );
}

export default ProfileDirectory;
