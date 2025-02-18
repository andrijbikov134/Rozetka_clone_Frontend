import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Feedback.module.css'; 
import { useState, useEffect } from 'react';

const Feedback = (props) => {
  const navigate = useNavigate();

  let location = useLocation();

  const [product, setProduct] = useState([]);

  const [hover, setHover] = useState(null);
  const [totalStars, setTotalStars] = useState(5);

  const [product_id, setProductId] = useState(location.pathname.split('/').pop()); 
  const [comment, setComment] = useState(1);
  const [advantages, setAdvantages] = useState(1);
  const [disadvantages, setDisadvantages] = useState(1);
  const [grade, setGrade] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user_petrushka_style')));

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

  const handlerSubmitReview = (event) =>
  {
    event.preventDefault();
    let currentDate = new Date();
    let date = currentDate.getFullYear() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getDate();
    let url = `${props.localhost}/index.php?action=createreview&productid=${product_id}&comment=${comment}&advantages=${advantages}&disadvantages=${disadvantages}&grade=${grade}&datereview=${date}&userid=${user.id}`;
        fetch(url, {
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded', 
        },
        
    })
    .then(response => response);
    navigate(-1);

  }
  const loadProductTitle = () =>
  {
    let url = `${props.localhost}/index.php?action=getProductById&id=${product_id}`;
        fetch(url, {
        method: 'POST',
        header: {
          'Content-Type': 'application/json', 
        }, 
    })
    .then(response => response.json())
    .then(response =>
      setProduct(response[0])
    );
  }


  useEffect(() => {
    loadProductTitle();
  }, []);

  useEffect(() => {

  }, [product_id]);

  return (
    <>

        <form onSubmit={handlerSubmitReview} className={styles.main_container} action="">
          <div>{product.title}</div>
          <input type="hidden" name='productid' value='1' />
          <div className={styles.bold}>Оцінка товару</div>
          <div>
          {[...Array(totalStars)].map((star, index) => {
            const currentRating = index + 1;

            return (
              <label key={index}>
                <input
                  key={star}
                  className={styles.input_radio}
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onChange={() => setGrade(currentRating)}
                />
                <span
                  className="star"
                  style={{
                    color:
                      currentRating <= (hover || grade) ? "#ffc107" : "#e4e5e9",
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
          {/* <input type="hidden" name='userid' value='' /> */}
          <textarea className={styles.comment} placeholder='Коментар' name='comment' onChange={handlerCommentChanged}></textarea>
          <textarea placeholder='Переваги' name='advantages' onChange={handlerAdvantagesChanged}></textarea>
          <textarea placeholder='Недоліки' name='disadvantages' onChange={handlerDisadvantagesChanged}></textarea>
          <input className={styles.button_submit} type='submit' value='Залишити відгук'/>

        </form>
    </>
  );
}

export default Feedback;
