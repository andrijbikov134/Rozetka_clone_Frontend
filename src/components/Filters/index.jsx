import { useEffect, useState } from "react";
import styles from './Filters.module.css'

const Filters = ({localhost, sortOrder, onFilterChange, priceR }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(priceR);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
 
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
    })
  }

  const loadSizes = () =>
    {
      fetch(`${localhost}/index.php?action=getAllSizes`, {
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
  

  // Обробка вибору брендів
  const handleBrandChange = (event) => {
    const brandId = event.target.value;
    const brandTitle = event.target.dataset.title;
    let updatedBrands = [...selectedBrands];

    if (event.target.checked)
    {
      updatedBrands.push({id: brandId, title: brandTitle});
    } 
    else
    {
      updatedBrands = updatedBrands.filter((b) => b.id !== brandId);
    }

    setSelectedBrands(updatedBrands);
    onFilterChange({ brands: updatedBrands, priceRange: priceRange, sizes: selectedSizes ,sort: sortOrder });
  };

  // Обробка діапазону цін
  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    if(priceRange[name] != value)
    {
      const updatedRange = { ...priceRange, [name]: value };
  
      setPriceRange(updatedRange);
    }
  };

  const handleSizeChange = (event) => {
    const sizeId = event.target.value;
    const sizeTitle = event.target.dataset.title;
    let updatedSizes = [...selectedSizes];

    if (event.target.checked)
    {
      updatedSizes.push({id: sizeId, title: sizeTitle});
    } 
    else
    {
      updatedSizes = updatedSizes.filter((s) => s.id !== sizeId);
    }      

    setSelectedSizes(updatedSizes);
    onFilterChange({ brands: selectedBrands, priceRange: priceRange, sizes: updatedSizes, sort: sortOrder });
  };


  useEffect(() => {
    loadBrands();
    loadSizes();
  }, []);

 

  return (
    <div className={styles.filter_container}>

      {/* Фільтр за брендом */}
      <h3>Бренд</h3>
      <div className={styles.brand_list}>
        {brands.map((brand) => (
          <div key={brand.id} className={styles.brand_element}>
            <input
              type="checkbox"
              value={brand.id}
              data-title={brand.title}
              onChange={handleBrandChange}
            />
            <div>{brand.title}</div>
          </div>
        ))}
      </div>
      <hr className={styles.hr} />

      {/* Фільтр за ціною */}
      <h3>Ціна</h3>
      <div className={styles.price_range}>
        <input
          type="text"
          name="min"
          placeholder="від"
          value={priceRange.min}
          onChange={handlePriceChange}
        />
        <span> - </span>
        <input
          type="text"
          name="max"
          placeholder="до"
          value={priceRange.max}
          onChange={handlePriceChange}
        />
        <button onClick={() => onFilterChange({ brands: selectedBrands, priceRange: priceRange, sizes: selectedSizes, sort: sortOrder })}>OK</button>
      </div>
      <hr className={styles.hr} />
      
      {/* Фільтр за розміром */}
      <h3>Розмір</h3>
      <div className={styles.size_list}>
      {sizes.map((size) => (
          <div key={size.id} className={styles.size_element}>
            <input
              type="checkbox"
              value={size.id}
              data-title={size.title}
              onChange={handleSizeChange}
            />
            <div>{size.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
