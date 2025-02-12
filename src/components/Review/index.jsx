import React, {  useEffect, useState } from 'react';
import styles from "./Review.module.css"

const Review = (props) => {

  let date = new Date(props.review.datereview);

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.user_date_container}>
          <div className={styles.bold}>Ірина Іванова</div>
          <div>{date.toLocaleDateString()}</div>
        </div>
        <div className={styles.grade_container}>
          {     
           [...Array(props.review.grade)].map(
            (x, i) =>  
            {
              return  <img className={styles.img_star} src={props.localhostFrontend + "/img/star_review.png"} alt="" />
            }
            )
 
          }
        </div>
        <div className={styles.advantages_container}> <span className={styles.underline}>Переваги:</span> {props.review.advantages}</div>
        <div className={styles.disadvantages_container}><span className={styles.underline}>Недоліки:</span> {props.review.disadvantages}</div>
        <div className={styles.comment_container}>{props.review.comment}</div>
      </div>
    </>
);
}

export default Review;
