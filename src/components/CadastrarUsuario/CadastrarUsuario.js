import React, { Component } from "react";
import Endereco from "./Endereco";
import Pagamento from "./Pagamento";
import Resumo from "./Resumo";
import Perfil from "./Perfil";
import jwt from "jwt-decode";

export default class CadastrarUsuario extends Component {
  state = {
    step: 1,
    nome: "",
    email: "",
    senha: "",
    notificacoes: true,
    telefone: "",
    cpf: "",
    plano: 1,
    cartao: {
      nome: "",
      numero: "",
      cvc: "",
    },
    logradouro: "",
    complemento: "",
    numero: "",
    bairro: "",
    localidade: "",
    uf: "",
    cep: "",
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  handleChange = input => e => {
    const { value } = e.target;
    if (input === "itens") {
      const { itens } = this.state;
      const isChecked = itens.includes(value);

      if (isChecked) {
        this.setState(prevState => ({
          itens: prevState.itens.filter(item => item !== value),
        }));
      } else {
        this.setState(prevState => ({
          itens: [...prevState.itens, value],
        }));
      }
    } else {
      this.setState({ [input]: value });
    }
  };

  handeSubmit = () => {
    const {
      nome,
      email,
      senha,
      notificacoes,
      telefone,
      cpf,
      plano,
      cartao,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep,
    } = this.state;

    const usuario = {
      nome,
      email,
      senha,
      notificacoes,
      telefone,
      cpf,
      plano,
      cartao,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep,
    };

    console.log(usuario);

    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const data = jwt(storedToken);
        console.log(data);
        alert("Compra efetuada com sucesso para o cliente codigo:");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Usuario não autenticado! Por favor fazer o login!");
    }
  };

  render() {
    const { step } = this.state;
    const  {
      nome,
      email,
      senha,
      notificacoes,
      telefone,
      cpf,
      plano,
      cartao,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep,
    } = this.state;

    const values = {
      nome,
      email,
      senha,
      notificacoes,
      telefone,
      cpf,
      plano,
      cartao,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep,
    };

    switch (step) {
      case 1:
        return (
          <Perfil
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <Endereco
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <Pagamento
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 4:
        return (
          <Resumo
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handeSubmit={this.handeSubmit}
            handleChange={this.handleChange}
            values={values}
          />
        );
      // nunca esqueça o padrão caso contrário, o código VS seria louco!
      default:
        return <p>Erro</p>;
    }
  }
}
