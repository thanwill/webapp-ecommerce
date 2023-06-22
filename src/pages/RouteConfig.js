import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Perfil from './perfil';
import Home from './inicio';
import Header from '../components/Header';
import Error404 from '../components/404';
import Login from './login';
import ListarProdutos from '../components/ListarProdutos';
import GestaoEstoque from '../components/GestaoEstoque';
const RouteConfig = () => {

  return (
    <Router basename={process.env.PUBLIC_URL}>
        <Header />
      <Routes>        
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<Perfil/>} />
        <Route path="/estoque" element={<GestaoEstoque/>} />
        <Route path="/produtos" element={<ListarProdutos/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<Error404/>} />
      </Routes>
    </Router>
  );
};

export default RouteConfig;
