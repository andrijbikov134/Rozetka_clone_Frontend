import { useEffect, useState } from "react";
import styles from './Filters.module.css'
import { useLocation } from "react-router-dom";

const Filters = ({products, localhost, sortOrder, onFilterChange, priceR }) =>
{
  const location = useLocation();
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(priceR);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [countries, setCountries] = useState([]);
 
  const loadBrands = () =>
  {
    fetch(`${localhost}/index.php?action=getAllBrands`,
    {
      method: 'POST',
      header: {
        'Content-Type': 'application/json', 
      },
    })
    .then(response =>
      response.json()
      )
    .then(response =>
    {
      setBrands(response);
    })
  }

  const loadSizes = () =>
  {
    if(products.length != 0 && !isLoaded)
    {
      fetch(`${localhost}/index.php?action=getAllSizes`,
      {
        method: 'POST',
        header:
        {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(products),
      })
      .then(response =>
        response.json()
        )
      .then(response =>
      {
        setSizes(response);
        setIsLoaded(true);
      })
    }
  }
  
  const loadCountries = () =>
  {
    fetch(`${localhost}/index.php?action=getAllCountries`,
    {
      method: 'POST',
      header:
      {
        'Content-Type': 'application/json', 
      },
    })
    .then(response =>
      response.json()
      )
    .then(response =>
    {
      setCountries(response);
    })
  }

  // Обробка вибору брендів
  const handleBrandChange = (event) =>
  {
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
    onFilterChange({ brands: updatedBrands, priceRange: priceRange,countries: selectedCountries,sizes: selectedSizes ,sort: sortOrder });
  };

  // Обробка діапазону цін
  const handlePriceChange = (event) =>
  {
    const { name, value } = event.target;
    if(priceRange[name] != value)
    {
      const updatedRange = { ...priceRange, [name]: value };
  
      setPriceRange(updatedRange);
    }
  };

  const handleSizeChange = (event) =>
  {
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
    onFilterChange({brands: selectedBrands, priceRange: priceRange, countries: selectedCountries, sizes: updatedSizes, sort: sortOrder});
  };

  const handlerOnChangeCountries = (event) =>
  {
    const countryId = event.target.value;
    const countryTitle = event.target.dataset.title;
    let updatedCountries = [...selectedCountries];

    if (event.target.checked)
    {
      updatedCountries.push({id: countryId, title: countryTitle});
    } 
    else
    {
      updatedCountries = updatedCountries.filter((c) => c.id !== countryId);
    }      

    setSelectedCountries(updatedCountries);
    onFilterChange({brands: selectedBrands, priceRange: priceRange, countries: updatedCountries, sizes: selectedSizes, sort: sortOrder});
  }

  const handlerOnClickClearFilters = () => 
  {
    onFilterChange({brands: [], countries: [], priceRange: {min: 0, max: 100000}, sizes: [], sort: sortOrder });
    setSelectedBrands([]);
    setSelectedCountries([]);
    setSelectedSizes([]);
    setPriceRange({min: 0, max: 100000});
  }

  useEffect(() =>
  {
    loadBrands();
    loadSizes();
    loadCountries();
  }, [products]);

  useEffect(() =>
  {
    setIsLoaded(false);
  }, [location]);
 

  return (
    <div className={styles.filter_container}>
      <div className={styles.clear_filters_button} onClick={handlerOnClickClearFilters}>
        Очистити все
      </div>
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
              checked={selectedBrands.filter((selectedBrand) => selectedBrand.id == brand.id).length == 0 ? false : true}
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
        <button onClick={() => onFilterChange({ brands: selectedBrands, priceRange: priceRange, sizes: selectedSizes, countries: selectedCountries, sort: sortOrder })}>OK</button>
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
              checked={selectedSizes.filter((selectedSize) => selectedSize.id == size.id).length == 0 ? false : true}
            />
            <div>{size.title}</div>
          </div>
        ))}
      </div>

      {/* Фільтр за країною-виробником */}
      <h3>Країна-виробник</h3>
      <div className={styles.size_list}>
      {countries.map((country) => (
          <div key={country.id} className={styles.size_element}>
            <input
              type="checkbox"
              value={country.id}
              data-title={country.title}
              onChange={handlerOnChangeCountries}
              checked={selectedCountries.filter((selectedCountry) => selectedCountry.id == country.id).length == 0 ? false : true}
            />
            <div>{country.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
