import classes from './App.module.scss';
import Header from './component/header';
import Footer from './component/footer';
import Login from './page/login';
import Home from './page/home';
import Product from './page/product';
import AddProduct from './page/addproduct';
import Account from './page/account';
import Pagenotfound from './page/pagenotfound';

import AdminContext from './context/adminContext';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

function App() {

  const [items, setItems] = useState({})
  const [log, setLog] = useState(false)
  const accType = ['Admin', 'Customer', 'Editor', 'Merchant']

  useEffect(() => {
    axios.get('https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json')
      .then(data => {
        localStorage.setItem('items', JSON.stringify(data.data));
      })
  }, []);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
      setItems(items)
    }
  }, [])

  return (
    <div className={classes.app}>
      <AdminContext.Provider value={{ log, setLog, items, accType }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path='/' element={<Navigate to='/home' />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/home' element={log ? <Home /> : <Login />} />
            <Route exact path='/product' element={log ? <Product /> : <Login />} />
            <Route exact path='/product/add_product' element={log ? <AddProduct /> : <Login />} />
            <Route exact path='/account' element={log ? <Account /> : <Login />} />
            <Route path='*' element={<Pagenotfound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AdminContext.Provider>
    </div>
  );
}

export default App;
