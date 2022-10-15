import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Homepage from './components/Homepage';
import Lot from './components/Lot';
import Login from './components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from "./components/Signup";
import Header from './components/Header';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Header />
    <br />
    <Routes>
      <Route path='/lot' element={<Lot />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup/>}  />
      <Route path='/*' element={<Homepage />} />
    </Routes>
    </BrowserRouter>

  </React.StrictMode>
);

