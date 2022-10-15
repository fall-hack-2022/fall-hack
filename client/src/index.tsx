import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Homepage from './components/Homepage';
import Lots from './components/Lots';
import Login from './components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from "./components/Signup";
import Header from './components/Header';
import NewLot from "./components/NewLot";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className="h-screen flex flex-col">
    <BrowserRouter>
    <Header />
    <div className='flex-col'>
      <div className='m-auto flex-grow'>
    <Routes>
        <Route path='/newlot' element={<NewLot />} />
        <Route path='/lots' element={<Lots />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup/>}  />
        <Route path='/*' element={<Homepage />} />
    </Routes>
    </div>
    </div>
    </BrowserRouter>
    </div>
  </React.StrictMode>
);

