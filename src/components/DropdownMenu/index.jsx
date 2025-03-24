import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './DropdownMenu.module.css';
import Dropdown from 'react-multilevel-dropdown';


const DropdownMenu = (props) =>
{
  let location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [categoriesSubSub, setCategoriesSubSub] = useState([]);



  const loadCategoriesSubSub = () =>
  {
    let url = `${props.localhost}/index.php?action=getCategorySubSubByCategoryTitle&category=${props.type}`
    fetch(url, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json', 
      },
    })
    .then(response =>
      response.json()
      )
    .then(response => {
      setCategoriesSubSub(response);
    })
  }

  const handlerMouseEnter = (event) =>
  {
   let div = event.currentTarget.closest('div').getElementsByTagName('div')[0];
   if(div)
    {
      div.classList.add(styles.display_block);
    }  
  }

  const handlerMouseLeave = (event) =>
  {
    let div = event.currentTarget.closest('div').getElementsByTagName('div')[0];
    if(div)
    {
      div.classList.remove(styles.display_block);
    }
  }

  const handlerMouseEnterSubItems = (event) => 
  {
    event.currentTarget.classList.add(styles.display_block);
  }

  const handlerMouseLeaveSubItems = (event) => 
  {
    event.currentTarget.classList.remove(styles.display_block);
  }
  
  const handlerOnClickLink = (event) =>
  {
    setOpen(false);
    navigate(event.currentTarget.dataset.url);
  }

  useEffect(() => {
    loadCategoriesSubSub();
  }, []);

  useEffect(() => {
    
    setOpen(true);
  }, [location]);

  return (
    <>
    {
      props.categoriesSub.length == 0 ? <></> :
      <div class={styles.dropdown}>
        <button class={styles.dropbtn}>{props.category_title}</button>

        <div class={styles.dropdown_content + ' ' + (open ? '' : styles.hidden)}>
          {
            props.categoriesSub.map((categorySub, index) =>
              {
                const url = "/" + props.type + "/" + categorySub.title;
                const id = categorySub.id;
                return (
                  <div>
                    <Link to={url} data-url={url} onMouseEnter={handlerMouseEnter} onMouseLeave={handlerMouseLeave} onClick={handlerOnClickLink}>{categorySub.title_ua}
                    </Link>
                    <div className={styles.sub_items_container} onMouseEnter={handlerMouseEnterSubItems} onMouseLeave={handlerMouseLeaveSubItems}>
                        {categoriesSubSub.map((categorySubSub) =>
                        {
                          let splited = categorySubSub.title.split('_');
                          let categorySubSubTitle = splited[0];
                          if(id == categorySubSub.categorysub_id)
                          {
                            return <Link reloadDocument to={url + "/" + categorySubSubTitle}>{categorySubSub.title_ua}</Link>;
                          }
                        })}
                      </div>

                  </div>
                )  
              })  
          }
        </div>
      </div>
    }
      
    </>
  );

  // return(
  //   <>
  //     <Dropdown
  //       title='Dropdown title'
  //       isActive={open}
        
       
  //     >
  //       <Dropdown.Item
  //         onClick={() => doSomething()}
  //       >
  //         Item 1
  //       </Dropdown.Item>
  //       <Dropdown.Item onClick={() => {navigate('/women/clothes'); setOpen(false) }}>
  //         Clothes
  //         <Dropdown.Submenu>
  //           <Dropdown.Item>
  //             Subitem 1
  //           </Dropdown.Item>
  //         </Dropdown.Submenu>
  //       </Dropdown.Item>
  //     </Dropdown>
  //   </>
  // );

}

export default DropdownMenu;