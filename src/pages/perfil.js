// cria o escopo da página de perfil chamando o componente header.

import React from "react";
import { useNavigate } from "react-router-dom";
import FuncoesUsuario from "../components/FuncoesUsuario";

export default function Perfil() {
  const navigate = useNavigate();

  if (!localStorage.getItem("token")) {
    navigate("/login");
  }

  return (
    <>
      <FuncoesUsuario />
    </>
  );
}
