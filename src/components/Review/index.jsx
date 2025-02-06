import React, {  useEffect, useState } from 'react';
import styles from "./Review.module.css"

const Review = (props) => {

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.user_date_container}>
          <div className={styles.bold}>Ірина Іванова</div>
          <div>{props.review.datereview}</div>
        </div>
        <div className={styles.grade_container}>
          {props.review.grade}
        </div>
        <div className={styles.advantages_container}> <span className={styles.underline}>Переваги:</span> {props.review.advantages}</div>
        <div className={styles.disadvantages_container}><span className={styles.underline}>Недоліки:</span> {props.review.disadvantages}</div>
        <div className={styles.comment_container}>{props.review.comment}</div>
      </div>
    </>
);
}

export default Review;
