import React, { useContext, useEffect, useId, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from "./ProductNewEdit.module.css"

const ProductNewEdit = ({localhost, googleBucketUrl}) => {

  const location = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState(location.state.product);
  const [newProduct, setNewProduct] = useState({id: null});
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [colors, setColors] = useState([]);
  const [countries, setCountries] = useState([]);
  const [category, setCategory] = useState(location.state.category || '');
  const [categorySub, setCategorySub] = useState(location.state.categorySub || '');
  const [categorySubSub, setCategorySubSub] = useState(location.state.categorySubSub || '');
  const [categorySubSubUa, setCategorySubSubUa] = useState(location.state.categorySubSubUa || '');

  const [title, setTitle] = useState(location.state.product != null ? location.state.product.title : '');
  const [partnumber, setPartnumber] = useState(location.state.product != null ? location.state.product.part_number : '');
  const [price, setPrice] = useState(location.state.product != null ? location.state.product.price : '');
  const [priceWithDiscount, setPriceWithDiscount] = useState(location.state.product != null ? location.state.product.price_with_discount : null);
  const [discount, setDiscount] = useState(location.state.product != null ? priceWithDiscount == null ? null : Math.floor((price - priceWithDiscount)/price*100) : null);
  const [isNew, setIsNew] = useState(location.state.product != null ? location.state.product.new_product : 0);
  const [selectedSizes, setSelectedSizes] = useState(location.state.product != null ? location.state.sizes : []);
  const [selectedColor, setSelectedColor] = useState({id: location.state.product != null ? location.state.product.color_id : 0});
  const [selectedBrand, setSelectedBrand] = useState({id: location.state.product != null ? location.state.product.brand_id : 0});
  const [selectedMaterial, setSelectedMaterial] = useState({id: location.state.product != null ? location.state.product.material_id : 0});
  const [selectedCountry, setSelectedCountry] = useState({id: location.state.product != null ? location.state.product.country_product_id : 0});
  const [imgPath, setImgPath] = useState(location.state.product != null ? (googleBucketUrl + location.state.product.pictures_path) : '');
  const [selectedImg, setSelectedImg] = useState([]);
  
  const [isValidPrice, setIsValidPrice] = useState(true);
  const [isValidTitle, setIsValidTitle] = useState(true);
  const [isValidPartnumber, setIsValidPartnumber] = useState(true);
  const [isValidSize, setIsValidSize] = useState(true);

  const loadCategory = () =>
  {
    if(location.state.product != null)
    {
      fetch(`${localhost}/index.php?action=getCategoryTitleById&id=${product.category_id}`, {
        method: 'POST',
        header: {
          'Content-Type': 'application/json', 
        },
      })
      .then(response =>
        response.json()
        )
      .then(response => {
        setCategory(response['title']); 
      })
    }
  }

  const loadCategorySub = () =>
  {
    if(location.state.product != null)
    {
      fetch(`${localhost}/index.php?action=getCategorySubTitleById&id=${product.category_sub_id}`, {
        method: 'POST',
        header: {
          'Content-Type': 'application/json', 
        },
      })
      .then(response =>
        response.json()
        )
      .then(response => {
        setCategorySub(response['title']); 
      })
    }
  }

  const loadCategorySubSub = () =>
  {
    if(location.state.product != null)
    {
      fetch(`${localhost}/index.php?action=getCategorySubSubTitleById&id=${product.category_sub_sub_id}`, {
        method: 'POST',
        header: {
          'Content-Type': 'application/json', 
        },
      })
      .then(response =>
        response.json()
        )
      .then(response => {
        let splitted = response['title'].split('_');
        setCategorySubSub(splitted[0]);
        setCategorySubSubUa(response['title_ua']); 
      })
    }
  }

  const loadBrands = () =>
  {
    fetch(`${localhost}/index.php?action=getAllBrands`, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json', 
      },
    })
    .then(response =>
      response.json()
      )
    .then(response => {
      setBrands(response);
      if(product == null)
      {
        setSelectedBrand(response[0]);
      }
    })
  }
  
  const loadSizes = () =>
  {
    fetch(`${localhost}/index.php?action=getSizesByCategorySub&categorysub=${categorySub}`, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json', 
      },
    })
    .then(response =>
      response.json()
      )
    .then(response => {
      setSizes(response);
    })
  }

  const loadMaterials = () =>
  {
    fetch(`${localhost}/index.php?action=getAllMaterials`, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json', 
      },
    })
    .then(response =>
      response.json()
      )
    .then(response => {
      setMaterials(response);
      if(product == null)
      {
        setSelectedMaterial(response[0]);
      }
    })
  }

  const loadColors = () =>
  {
    fetch(`${localhost}/index.php?action=getAllColors`, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json', 
      },
    })
    .then(response =>
      response.json()
      )
    .then(response => {
      setColors(response);
      if(product == null)
      {

        setSelectedColor(response[0]);
      }
    })
  }

  const loadCountries = () =>
  {
    fetch(`${localhost}/index.php?action=getAllCountries`, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json', 
      },
    })
    .then(response =>
      response.json()
      )
    .then(response => {
      setCountries(response);
      if(product == null)
      {
        setSelectedCountry(response[0]);
      }
    })
  }

  const handlerOnChangeBrand = (event) =>
  {
    const brandId = event.target.selectedOptions[0].value;
    const brandTitle = event.target.selectedOptions[0].dataset.title;
    setSelectedBrand({id: brandId, title: brandTitle});
  }

  const handlerOnChangeColor = (event) =>
  {
    const colorId = event.target.selectedOptions[0].value;
    const colorTitle = event.target.selectedOptions[0].dataset.title;
    setSelectedColor({id: colorId, title: colorTitle});
  }

  const handlerOnChangeMaterial = (event) =>
  {
    const materialId = event.target.selectedOptions[0].value;
    const materialTitle = event.target.selectedOptions[0].dataset.title;
    setSelectedMaterial({id: materialId, title: materialTitle});
  }

  const handlerOnChangeCountry = (event) =>
  {
    const countryId = event.target.selectedOptions[0].value;
    const countryTitle = event.target.selectedOptions[0].dataset.title;
    setSelectedCountry({id: countryId, title: countryTitle});
  }

  const handlerOnChangeTitle = (event) => 
  {
    let title = event.target.value;
    setTitle(title);
    title.length == 0 ? setIsValidTitle(false) : setIsValidTitle(true);
  }

  const handlerOnChangePartnumber = (event) => 
  {
    let partnumber = event.target.value;
    setPartnumber(partnumber);
    partnumber.length == 0 ? setIsValidPartnumber(false) : setIsValidPartnumber(true);
  }

  const handlerOnChangePrice = (event) => 
  {
    let price = event.target.value;
    let pattern = new RegExp('^[1-9]*[0-9.]*$');
    if(pattern.test(price))
    {
      setPrice(price);
      setIsValidPrice(true);   
    }
    if(price.length == 0)
    {
      setIsValidPrice(false);
    }
  }

  const handlerOnChangeIsNew = (event) => 
  {
    setIsNew(Number(event.target.checked));
  }

  const handlerOnChangePriceWithDiscount = (event) =>
  {
    let priceWithDiscount = event.target.value;
    let pattern = new RegExp('^[1-9]*[0-9.]*$');
    if(pattern.test(price))
    {
      if(priceWithDiscount == "")
      {
        setDiscount('')
        setPriceWithDiscount('');
      }
      else
      {
        setDiscount(Math.floor((price - priceWithDiscount)/price*100))
        setPriceWithDiscount(priceWithDiscount);
      }
    }
  }

  const handlerOnChangeDiscount = (event) =>
  {
    let discount = event.target.value;
    let pattern = new RegExp('^[1-9]*[0-9.]*$');
    if(pattern.test(discount))
    {
      if(discount == "")
      {
        setDiscount('')
        setPriceWithDiscount('');
      }
      else
      {
        setDiscount(discount)
        setPriceWithDiscount(Math.floor(price *(100-discount) / 100));
      }
    }
  }

  const handlerSizeChange = (event) => {
    const sizeId = event.target.value;
    const sizeTitle = event.target.dataset.title;
    let updatedSizes = [...selectedSizes];

    if (event.target.checked)
    {
      updatedSizes.push({id: sizeId, title: sizeTitle});
    } 
    else
    {
      updatedSizes = updatedSizes.filter((s) => s.id != sizeId);
    }
    updatedSizes.length == 0 ? setIsValidSize(false) : setIsValidSize(true);      

    setSelectedSizes(updatedSizes);
  };

  const handlerColorChange = (event) =>
  {
    const colorId = event.target.value;
    const colorTitle = event.target.dataset.title;
    let updatedColors = [...selectedColor];

    if (event.target.checked)
    {
      updatedColors.push({id: colorId, title: colorTitle});
    } 
    else
    {
      updatedColors = updatedColors.filter((c) => c.id != colorId);
    }      

    setSelectedColor(updatedColors);
  
  }


  const handlerOnChangeImg = (event) =>
  {
    setImgPath(URL.createObjectURL(event.target.files[0]));    
    setSelectedImg(event.target.files[0]);
  }

  const validation = () =>
  {
    let result = true;
    if(title.length == 0)
    {
      setIsValidTitle(false);
      result = false;
    }
    if(price.length == 0)
    {
      setIsValidPrice(false);
      result = false;
    }
    if(partnumber.length == 0)
    {
      setIsValidPartnumber(false);
      result = false;
    }
    if(selectedSizes.length == 0)
    {
      setIsValidSize(false);
      result = false;
    }
    return result;
  }

  const addOrUpdateProductInDB = () =>
  {
    if(validation())
    {
      let newProduct = new FormData();
      newProduct.append('id', product == null ? null : product.id);
      newProduct.append('title', title);
      newProduct.append('color_id', selectedColor.id);
      newProduct.append('brand_id', selectedBrand.id);
      newProduct.append('price', price);
      newProduct.append('material_id', selectedMaterial.id);
      newProduct.append('country_product_id', selectedCountry.id);
      newProduct.append('part_number', partnumber);
      newProduct.append('category', category);
      newProduct.append('categorySub', categorySub);
      newProduct.append('categorySubSub', categorySubSub);
      newProduct.append('new_product', isNew);
      if(price == priceWithDiscount || priceWithDiscount == '')
      {
        newProduct.append('price_with_discount', null);
      }
      else
      {
        newProduct.append('price_with_discount', priceWithDiscount);
      }

      if(location.state.product != null)
      {
        newProduct.append('oldImgPath', product.pictures_path);
      }
      else
      {
        newProduct.append('oldImgPath', '');
      }
      selectedSizes.map((size) => {
        newProduct.append('sizes[]', JSON.stringify(size));
      })

      if(selectedImg.length != 0)
      {
        newProduct.append('file', selectedImg);
      }

      try
      {
        fetch(`${localhost}/index.php?action=addOrUpdateProductInDB`,
          {
            method: 'POST',
            header: {
              'Content-Type': 'application/json', 
            },
            body: newProduct
          })
          .then(response =>
            response.json()
            ).then(response =>
            {
              if(response.error)
                {
                  console.log(response.error);
                
                }
                else if(response.message)
                {
                  console.log(response.message);
                }
                navigate(-1);
            }
            )
      }
      catch(error)
      {
        console.log(error);
      }
    }
  }

  const handlerOnClickSave = () =>
  {
    addOrUpdateProductInDB();
  }

  const handlerOnClickCancel = () =>
  {
    navigate(-1);
  }

  useEffect(() => {
    loadBrands();
    loadSizes();
    loadMaterials();
    loadColors();
    loadCountries();
  }, []);

  useEffect(() =>
  {
    loadCategory();
    loadCategorySub();
    loadCategorySubSub(); 

  },[product])
  
  return (
      <>

      <div className={styles.main_container}>
        <div></div>
        <h3>{product == null ? 'Додавання нового' : 'Редагування'} товару</h3>
        <div className={styles.title}>Назва товару:</div>
        <input className={styles.title_input + " " + (isValidTitle ? '' : styles.error)} type="text" value={title} onChange={handlerOnChangeTitle}/>

        <div className={styles.title}>Артикул:</div>
        <div className={styles.partnumber_type_container}>
          <input className={styles.partnumber_input + " " + (isValidPartnumber ? '' : styles.error)} type="text" value={partnumber} onChange={handlerOnChangePartnumber}/>

           <div className={styles.title}>Новинка:</div>
           <input className={styles.input_new} type="checkbox" checked={isNew} onChange={handlerOnChangeIsNew}/>

           <div className={styles.title}>Тип:</div>
           <div className={styles.title_categorySubSub} >{categorySubSubUa}</div>
        </div>
        
        <div className={styles.title}>Ціна, грн.:</div>
        <input className={styles.price_input + " " + (isValidPrice ? '' : styles.error)} type="text" value={price} onChange={handlerOnChangePrice}/>
        
        <div className={styles.title}>Ціна зі знижкою, грн.:</div>
        <input className={styles.price_input} type="text" value={priceWithDiscount} onChange={handlerOnChangePriceWithDiscount}/>

        <div className={styles.title}>Знижка, %:</div>
        <input className={styles.price_input} type="text" value={discount} onChange={handlerOnChangeDiscount}/>

        <div className={styles.title}>Розмір:</div>
        <div className={styles.sizes_container  + " " + (isValidSize ? '' : styles.error)}>
          {
            sizes.map((size) => {
              let foundSize = selectedSizes.filter((s) => s.id == size.id);
              return (
                <div className={styles.size_container}>
                  <input className={styles.input} type="checkbox" onChange={handlerSizeChange} checked={foundSize.length != 0} value={size.id} data-title={size.title}/>
                  <div>{size.title}</div>
                </div>
              )
            })
          }
        </div>
        <div className={styles.title}>Бренд:</div>
        <select className={styles.brands_select} name="brand" id="" onChange={handlerOnChangeBrand}>
          {
            brands.map((brand) => {
              return <option value={brand.id} data-title={brand.title} selected={brand.id == selectedBrand.id}>{brand.title}</option>
            })
          }
        </select>
           
        <div className={styles.title}>Колір:</div>
        <select className={styles.colors_container} onChange={handlerOnChangeColor}>
          {
            colors.map((color) => {
              return <option value={color.id} data-title={color.title} selected={color.id == selectedColor.id}>{color.title}</option>
            })
            // colors.map((color) => {
            //   return (
            //     <div className={styles.color_container}>
            //       <input className={styles.input} type="checkbox" onChange={handlerColorChange} value={color.id} data-title={color.title}/>
            //       <div>{color.title}</div>
            //     </div>
            //   )
            // })
          }
        </select>
        <div className={styles.title}>Матеріал:</div>
        <select className={styles.materials_select} name="material" id="" onChange={handlerOnChangeMaterial}>
        {
            materials.map((material) => {
              return <option value={material.id} data-title={material.title} selected={material.id == selectedMaterial.id}>{material.title}</option>
            })
        }
        </select>
        <div className={styles.title}>Країна-виробник:</div>
        <select className={styles.countries_container} onChange={handlerOnChangeCountry}>
          {
            countries.map((country) => {
              return <option value={country.id} data-title={country.title} selected={country.id == selectedCountry.id}>{country.title}</option>
            })
          }
        </select>
        
        <div className={styles.button_cancel} onClick={handlerOnClickCancel}>Скасувати</div>
        <div className={styles.button_save} onClick={handlerOnClickSave}>Зберегти</div>
      </div>
      <div>
        <img className={styles.img} src={imgPath} alt="" />
        <div className={styles.choose_img_container}>
          <label for="img_path" className={styles.img_input}>Обрати картинку</label>
          <input id="img_path" className={styles.display_none} onChange={handlerOnChangeImg} type="file" />
          
        </div>
      </div>
      </>
  );
}

export default ProductNewEdit;
