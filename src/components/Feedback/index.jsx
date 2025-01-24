import { useNavigate } from 'react-router-dom';
import styles from './Feedback.module.css'; 
import { useState } from 'react';

const Feedback = (props) => {
  const navigate = useNavigate();


  const [hover, setHover] = useState(null);
  const [totalStars, setTotalStars] = useState(5);

  const [product_id, setProductId] = useState(1);
  const [comment, setComment] = useState(1);
  const [advantages, setAdvantages] = useState(1);
  const [disadvantages, setDisadvantages] = useState(1);
  const [star_quantity, setStarQuantity] = useState(null);
  const [user_id, setUserId] = useState(1);

  const handlerCommentChanged = (event) =>
  {
    setComment(event.target.value);
  }
  const handlerAdvantagesChanged = (event) =>
  {
    setAdvantages(event.target.value);
  }
  const handlerDisadvantagesChanged = (event) =>
  {
    setDisadvantages(event.target.value);
  }

  const handlerSubmit = (event) =>
  {
    event.preventDefault();
    let url = `http://localhost:8888/index.php?action=createcomment&productid=${product_id}&comment=${comment}&advantages=${advantages}&disadvantages=${disadvantages}&starquantity=${star_quantity}&userid=${user_id}`;
        fetch(url, {
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded', 
        },
        
    })
    .then(response => response);
    navigate('/')

  }

  return (
    <>

        <form onSubmit={handlerSubmit} className={styles.main_container} action="">
          <div>Товар 1</div>
          <input type="hidden" name='productid' value='1' />
          <div className={styles.bold}>Оцінка товару</div>
          <div>
          {[...Array(totalStars)].map((star, index) => {
            const currentRating = index + 1;

            return (
              <label key={index}>
                <input
                  key={star}
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onChange={() => setStarQuantity(currentRating)}
                />
                <span
                  className="star"
                  style={{
                    color:
                      currentRating <= (hover || star_quantity) ? "#ffc107" : "#e4e5e9",
                    fontSize: "5rem",
                    cursor: "pointer"
  
                  }}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                >
                  &#9733;
                </span>
              </label>
            );
          })}
          </div>
          {/* <div className={styles.stars}>
            <img className={styles.img_star} src="./img/star_empty.png" alt="" />
            <img className={styles.img_star} src="./img/star_empty.png" alt="" />
            <img className={styles.img_star} src="./img/star_empty.png" alt="" />
            <img className={styles.img_star} src="./img/star_empty.png" alt="" />
            <img className={styles.img_star} src="./img/star_empty.png" alt="" />
          </div> */}
          <input type="hidden" name='starquantity' value='1' />
          <input type="hidden" name='userid' value='1' />
          <textarea className={styles.comment} placeholder='Коментар' name='comment' onChange={handlerCommentChanged}></textarea>
          <textarea placeholder='Переваги' name='advantages' onChange={handlerAdvantagesChanged}></textarea>
          <textarea placeholder='Недоліки' name='disadvantages' onChange={handlerDisadvantagesChanged}></textarea>
          <input className={styles.button_submit} type='submit' value='Залишити відгук'/>

        </form>
    </>
  );
}

export default Feedback;
