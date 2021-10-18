import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Fazendas from './Components/Fazendas/Fazendas';
import Login from './Components/Accounts/Login/Login';
import Cadastro from './Components/Accounts/Cadastro/Cadastro';
import { UserStorage } from './Context/UserContext';

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />    
            <Route path="fazendas/" element={<Fazendas />} />
            <Route path="login/" element={<Login />} />
            <Route path="cadastro/" element={<Cadastro />} />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
