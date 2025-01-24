import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DropdownMenu.module.css';


const DropMenu = (props) =>
{
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMenuOne = () => {
    // do something
    setOpen(false);
  };

  const handleMenuTwo = () => {
    // do something
    setOpen(false);
  };

  const handleOnClick = (event) =>
  {
    let url = event.target.dataset.url;
    navigate(url);
    setOpen(false);
  }

  return (
    <div className={styles.dropdown}>
    <button onClick={handleOpen} className={styles.button_title}>{props.category_title} ▼</button>
    {open ? (
      <ul className={styles.menu}>
        {props.categories.map((category) =>
        {
          let url = "/" + props.type + "/" + category.type;
          return(
            <li className={styles.menu_item}>
              <button onClick={handleOnClick} data-url={url}>{category.title}</button>
            </li>
          )
        })}
      </ul>
    ) : null}
  </div>
  );

}

export default DropMenu;