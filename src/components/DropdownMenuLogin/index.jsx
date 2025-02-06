import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './DropdownMenuLogin.module.css';


const DropdownMenuLogin = (props) =>
{
  const navigate = useNavigate();

  let a = props.user == 0;

  return (
    <>
      <div class={styles.dropdown}>
        <img class={styles.dropimg} src={props.src} onClick={props.handlerOnClickProfile}/>

        <div class={styles.dropdown_content + " " + (props.user == 0 ? styles.hidden : "")}>
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