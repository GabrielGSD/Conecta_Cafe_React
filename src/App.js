import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Fazendas from './Components/Fazendas/Fazendas';
import Login from './Components/Login/Login';
import Cadastro from './Components/Cadastro/Cadastro';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />    
            <Route path="fazendas/" element={<Fazendas />} />
            <Route path="login/" element={<Login />} />
            <Route path="cadastro/" element={<Cadastro />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
