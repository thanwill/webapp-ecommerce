import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Perfil from './perfil';
import Home from './inicio';
import Header from '../components/Header';
import Error404 from '../components/404';
const RouteConfig = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
        <Header />
      <Routes>        
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<Perfil/>} />
        <Route path="/estoque" element={<Error404/>} />
        <Route path="/produtos" element={<Error404/>} />
        <Route path="*" element={<Error404/>} />
      </Routes>
    </Router>
  );
};

export default RouteConfig;
