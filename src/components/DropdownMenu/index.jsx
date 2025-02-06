import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './DropdownMenu.module.css';


const DropdownMenu = (props) =>
{
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOnClick = (event) =>
  {
    let url = event.target.dataset.url;
    navigate(url);
    setOpen(false);
  }

  return (
    <>
      <div class={styles.dropdown}>
        <button class={styles.dropbtn}>{props.category_title}</button>

        <div class={styles.dropdown_content }>
          {
            props.categories.map((category) =>
              {
                let url = "/" + props.type + "/" + category.type;
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

export default DropdownMenu;