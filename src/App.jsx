
import './App.css'

// Бібліотека для календаря
import { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Feedback from './components/Feedback';
import PopularProducts from './components/PopularProducts';

function App()
{
  // Властивість, яка зберігає список товарів, отримуємо список товарів з контексту
  const [allProducts, setAllProducts] = useState([]);

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

  const loadAllProducts = () =>
  {
    fetch("http://192.168.0.113:8080/api/", {
      method: 'POST',
      header: {
        'Content-Type': 'application/json', //application/x-form-urlencoded
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

  /////////////////////////////////////////////////////////////////
  // Хук, який спрацьовує на зміну events або selectedDate, та виконує функції оновлення та зберігання подій
  useEffect(() =>
  {
    loadAllProducts();  
  },
  [])

  
  return (
    <>
      <Header/>
      <div className="main_block">
        <Routes>
          <Route path='/' element={<PopularProducts products={allProducts}/>}/>
          <Route path="/feedback" element={<Feedback/>}/>
        </Routes>

      </div>


     
      <Footer/>
    </>
  )
}

export default App
