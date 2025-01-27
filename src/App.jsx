
import './App.css'

// Бібліотека для компонентів
import { useId, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Feedback from './components/Feedback';
import PopularProducts from './components/ListProductsSearchResult';
import FemaleClothes from './components/CategoriesSubSub';
import Shops from './components/Shops';
import Contacts from './components/Contacts';
import Sizes from './components/Sizes';
import ScrollToTop from './components/ScrollToTop';
import Delivery from './components/Delivery';
import GiftCertificates from './components/GiftCertificates';
import QuestionsAndAnswers from './components/QuestionsAndAnswers';
import ListProducts from './components/ListProducts';
import CategoriesSubSub from './components/CategoriesSubSub';
import ListProductsSearchResult from './components/ListProductsSearchResult';
import ProductFull from './components/ProductFull';
import PaymentMethods from './components/PaymentMethods';
import Cart from './components/Cart';


function App()
{
  const navigate = useNavigate();
  // Властивість, яка зберігає список товарів, отримуємо список товарів з контексту
  const [allProducts, setAllProducts] = useState([]);

  const input_search_id = useId();

  const [foundProducts, setFoundProducts] = useState([]);

  const [searchTitle, setSearchTitle] = useState('');

  const [foundProduct, setFoundProduct] = useState();

  const [cart, setCart] = useState([]);

  const [cartCount, setCartCount] = useState(0);

  // Функція для разового створення JSON-файла
  const saveToLocalStorage = (key, array) =>
  {
    if(array.length > 0)
    {
      let json = JSON.stringify(array);
      localStorage.setItem(key,json);
    }
  }

  const loadFromLocalStorage = (key, method) =>
  {
    let array = JSON.parse(localStorage.getItem(key));
    method(array);
  }

  // /index.php?name=asdasd&email=asd8&status=active&type=publisher&ssn=2342&action=create
  const loadPopularProducts = () =>
  {
    fetch("http://localhost:8888/index.php?action=getPopularProducts", {
      method: 'POST',
      header: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({action: 1})
    })
    .then(response =>
      response.json()
      )
    .then(response => {
      setAllProducts(response);
    })
    
  }

  const handlerSearchProducts = (input_title) =>
  {
    if(input_title != '')
    {

      let url = `http://localhost:8888/index.php?action=getProductsFilteredByTitle&input_title=${input_title}`;
      fetch(url, {
        method: 'POST',
        header: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({action: 1})
      })
      .then(response =>
        response.json()
        )
      .then(response => {
        setFoundProducts(response);
      })
      setSearchTitle(input_title);
      navigate('/search_result');
    }
  }

  const findProductById = (product_id) =>
  {
    let url = `http://localhost:8888/index.php?action=getProductById&id=${product_id}`;
    fetch(url, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({action: 1})
    })
    .then(response =>
      response.json()
      )
    .then(response => {
      setFoundProduct(response[0]);
      navigate(`/product/id=${product_id}`);
    })
  }

  const handlerSearchTitleClean = () =>
  {
    document.getElementById(input_search_id).value = '';
  }

  const handlerOnClickProduct = (product_id) =>
  {
    findProductById(product_id);
  }

  const handlerOnClickAddToCart = (id) =>
  {
    let newCart = cart.map((product) => product);
    let foundProduct = newCart.filter((product) => {
      return product.id == id;
    })
    if(foundProduct.length == 0)
    {
      newCart.push(
        {
          id: id,
          quantity: 1
        }
      );
    }
    else
    {
      let oldQuantity = foundProduct[0].quantity;
      newCart = cart.map((product) =>
      {
        if(product.id == id)
        {
          return {
            id: product.id,
            quantity: oldQuantity+1
          };
        }
        else{
          return product;
        }
      })
    }
    setCart(newCart);
  }

  const updateCartCount = () =>
  {
    let newCartCount = cart.reduce((accumulator, {quantity}) => accumulator + quantity,0);
    setCartCount(newCartCount);
  }
  

  /////////////////////////////////////////////////////////////////
  // Хук, який спрацьовує на зміну events або selectedDate, та виконує функції оновлення та зберігання подій
  useEffect(() =>
  {
    loadPopularProducts();  
  },
  [foundProducts])

  useEffect(() =>
    {
      updateCartCount();
      saveToLocalStorage('order_petrushka_style',cart);
    },
  [cart])

  useEffect(() =>
    {
      loadFromLocalStorage('order_petrushka_style',setCart)
    },
  [])



  
  return (
    <>
      <Header handlerSearchProducts={handlerSearchProducts} search_title={searchTitle} input_search_id={input_search_id} cart_count={cartCount}/>
      <div className="main_block">
        <ScrollToTop/>
        <Routes>
          <Route path='/' element={<ListProducts action='getPopularProducts' title='ПОПУЛЯРНІ ТОВАРИ' handlerSearchTitleClean={handlerSearchTitleClean} handlerOnClickProduct={handlerOnClickProduct}/>}/>
          <Route path='/women/clothes' element={<CategoriesSubSub category='women' category_sub='clothes'/>} />
          <Route path='/women/shoes' element={<CategoriesSubSub category='women' category_sub='shoes'/>} />
          <Route path='/women/accessories' element={<CategoriesSubSub category='women' category_sub='accessories'/>} />
          <Route path='/women/clothes/down_jackets' element={<ListProducts products_title='Пуховики жіночі' category_id='Women' category_sub_id='Clothes' category_sub_sub_id='Down jackets' handlerOnClickProduct={handlerOnClickProduct}/>}/>
          <Route path='/product/*' element={<ProductFull product={foundProduct} handlerOnClickAddToCart={handlerOnClickAddToCart}/>}  />

          <Route path='/men/clothes' element={<CategoriesSubSub category='men' category_sub='clothes'/>} />
          <Route path='/men/shoes' element={<CategoriesSubSub category='men' category_sub='shoes'/>} />
          <Route path='/men/accessories' element={<CategoriesSubSub category='men' category_sub='accessories'/>} />

          <Route path='/children/clothes' element={<CategoriesSubSub category='children' category_sub='clothes'/>} />
          <Route path='/children/shoes' element={<CategoriesSubSub category='children' category_sub='shoes'/>} />
          <Route path='/children/accessories' element={<CategoriesSubSub category='children' category_sub='accessories'/>} />


          <Route path='/search_result' element={<ListProductsSearchResult products={foundProducts} search_title={searchTitle}/>}/>
          <Route path='/profile'    />
          <Route path='/cart' element={<Cart products={cart}/>}     />
          <Route path='/shops' element={<Shops/>}/>
          <Route path='/contacts' element={<Contacts/>}/>
          <Route path='/sizes' element={<Sizes/>}/>
          <Route path='/delivery' element={<Delivery/>}/>
          <Route path='/paymentmethods' element={<PaymentMethods/>}/>
          <Route path='questionsandanswers' element={<QuestionsAndAnswers/>}/>
          <Route path='/giftcertificates' element={<GiftCertificates/>}/>
          <Route path="/feedback" element={<Feedback/>}/>
        </Routes>

      </div>


     
      <Footer/>
    </>
  )
}

export default App
