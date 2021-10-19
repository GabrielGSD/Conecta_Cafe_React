import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Fazendas from './Components/Fazendas/Fazendas';
import Login from './Components/Accounts/Login/Login';
import Cadastro from './Components/Accounts/Cadastro/Cadastro';
import Fazenda from './Components/Produtor/Fazenda/Fazenda';
import Cafe from './Components/Produtor/Cafe/Cafe';
import { UserStorage } from './Context/UserContext';
import ProtectedRoute from './Components/Helper/ProtectedRoute';

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
            <ProtectedRoute path="conta/" element={< Home />} />
            <ProtectedRoute path="conta/fazenda" element={< Fazenda />} />
            <ProtectedRoute path="conta/cafe" element={< Cafe />} />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
