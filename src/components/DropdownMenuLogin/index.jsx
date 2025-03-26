import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './DropdownMenuLogin.module.css';


const DropdownMenuLogin = (props) =>
{
  const navigate = useNavigate();

  let a = props.user == 0;

  return (
    <>
      <div className={styles.dropdown}>
        <img className={styles.dropimg} src={props.src} onClick={props.handlerOnClickProfile}/>

        <div className={styles.dropdown_content + " " + (props.user == 0 ? styles.hidden : "")}>
          {
            props.categories.map((category) =>
              {
                let url = "/" + category.type;
                return (
                  <Link to={url}>{category.title}</Link>
                )  
              })  
          }
        </div>
      </div>
    </>
  );

}

export default DropdownMenuLogin;