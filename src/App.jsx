
import './App.css'

// Бібліотека для компонентів
import { useContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Feedback from './components/Feedback';
import PopularProducts from './components/PopularProducts';
import FemaleClothes from './components/CategoriesSubSub';
import Shops from './components/Shops';
import Contacts from './components/Contacts';
import Sizes from './components/Sizes';
import ScrollToTop from './components/ScrollToTop';
import DeliveryPayment from './components/DeliveryPayment';
import GiftCertificates from './components/GiftCertificates';
import QuestionsAndAnswers from './components/QuestionsAndAnswers';
import ListProducts from './components/ListProducts';
import CategoriesSubSub from './components/CategoriesSubSub';


function App()
{
  const navigate = useNavigate();
  // Властивість, яка зберігає список товарів, отримуємо список товарів з контексту
  const [allProducts, setAllProducts] = useState([]);

  const [findedProducts, setFindedProducts] = useState([]);

  // Функція для разового створення JSON-файла
  const saveFile = () =>
  {
    let arr = ["Мудрий не той, хто довів що-небудь, а той, хто знаючи істину, не сперечався.",
    "Хто зрозумів життя, той більше не поспішає, смакує кожну мить і спостерігає.",
    "Істинне призначення - це не те, чого хоче розум, це те, чого так пристрасно бажає наша душа.",
    "Живи так, щоб люди, зіткнувшись з тобою, посміхнулися, а спілкуючись з тобою, стали трохи щасливішими.",
    "Мине час, і життя покаже, що все було лише на краще.",
    "Більшість бачать калюжу, а одиниці відображення Місяця в ній.",
    "Що більше ви судите, то менше любите.",
    "Роби все, що можеш, з тим, що маєш, там, де ти є.",
    "Ціль без плану — це просто мрія.",
    "Якщо ви хочете мати те, що ніколи не мали, вам доведеться робити те, що ніколи не робили.",
    "Краще погано починати, ніж добре не діяти.",
    "Жодний транспорт не буде попутним, якщо не знаєш, куди йти."];
    let json = JSON.stringify(arr);
    localStorage.setItem("phrases",json);
  }
  // /index.php?name=asdasd&email=asd8&status=active&type=publisher&ssn=2342&action=create
  const loadAllProducts = () =>
  {
    fetch("http://localhost:8888/index.php?action=getAllproducts", {
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
    console.log("!!!!!!!!!!!!");
    let url = `http://localhost:8888/index.php?action=getProductsFilteredByTitles&input_title=${input_title}`;
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
      setFindedProducts(response);
    })
    navigate('/search_result');
  }

  /////////////////////////////////////////////////////////////////
  // Хук, який спрацьовує на зміну events або selectedDate, та виконує функції оновлення та зберігання подій
  useEffect(() =>
  {
    loadAllProducts();  
  },
  [findedProducts])

  
  return (
    <>
      <Header handlerSearchProducts={handlerSearchProducts}/>
      <div className="main_block">
        <ScrollToTop/>
        <Routes>
          <Route path='/' element={<PopularProducts products={allProducts}/>}/>
          <Route path='/women/clothes' element={<CategoriesSubSub category='women' category_sub='clothes'/>} />
          <Route path='/women/shoes' element={<CategoriesSubSub category='women' category_sub='shoes'/>} />
          <Route path='/women/accessories' element={<CategoriesSubSub category='women' category_sub='accessories'/>} />
          <Route path='/women/clothes/down_jackets' element={<ListProducts products_title='Пуховики жіночі' category_id='Women' category_sub_id='Clothes' category_sub_sub_id='Down jackets'/>}/>

          <Route path='/men/clothes' element={<CategoriesSubSub category='men' category_sub='clothes'/>} />
          <Route path='/men/shoes' element={<CategoriesSubSub category='men' category_sub='shoes'/>} />
          <Route path='/men/accessories' element={<CategoriesSubSub category='men' category_sub='accessories'/>} />

          <Route path='/children/clothes' element={<CategoriesSubSub category='children' category_sub='clothes'/>} />
          <Route path='/children/shoes' element={<CategoriesSubSub category='children' category_sub='shoes'/>} />
          <Route path='/children/accessories' element={<CategoriesSubSub category='children' category_sub='accessories'/>} />

          <Route path='/search_result' element={<PopularProducts products={findedProducts}/>}/>
          <Route path='/profile'    />
          <Route path='/cart'      />
          <Route path='/shops' element={<Shops/>}/>
          <Route path='/contacts' element={<Contacts/>}/>
          <Route path='/sizes' element={<Sizes/>}/>
          <Route path='/deliverypayment' element={<DeliveryPayment/>}/>
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
