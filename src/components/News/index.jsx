import { useState } from "react"
import styles from "./News.module.css"

const News = (props) =>
{
  const [newsPictures, setNewsPictures] = useState([]);

  return(
    <>
      <div className={styles.main_container}>
        <img src="./img/Sale50winter.png" alt="" />
      </div>
    </>
  );


}

export default News;