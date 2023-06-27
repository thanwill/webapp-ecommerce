import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FuncoesUsuarios from "./perfil";
import Header from "../components/Header";
import Error404 from "../components/404";
import Login from "./login";
import ListarProdutos from "../components/ListarProdutos";
import GestaoEstoque from "../components/GestaoEstoque";
import Cadastro from "./cadastro";
import Carrinho from "./carrinho";
import Perfil from "./perfil";
import Produtos from "./produtos";

const RouteConfig = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path='/' element={<Produtos />} />
        <Route path='/usuarios' element={<FuncoesUsuarios />} />
        <Route path='/estoque' element={<GestaoEstoque />} />
        <Route path='/produtos' element={<ListarProdutos />} />
        <Route path='/carrinho' element={<Carrinho />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/perfil' element={<Perfil />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </Router>
  );
};


export default RouteConfig;
