import React, { useState } from 'react'
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Cinema from './Pages/Cinema'
import Savings from './Pages/Savings'
import Paketlar from './Pages/Paketlar'

import { useTranslation } from 'react-i18next'


const App = () => {
  const {t, i18n} =useTranslation();
  const changeLanguage = (lng) =>{
     i18n.changeLanguage(lng);
  };
    

  return (

    
    <Router>
      <Header/>

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cinema' element={<Cinema/>} />
        <Route path='/savings' element={<Savings/>} />
        <Route path='/paketlar' element={<Paketlar/>} />
      </Routes>
        
    </Router>
  )
}

export default App