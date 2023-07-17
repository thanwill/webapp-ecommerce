import React, { Component } from "react";
import { UsuarioService } from "../../services/usuario.js";
import Endereco from "./Endereco";
import Pagamento from "./Pagamento";
import Resumo from "./Resumo";
import Perfil from "./Perfil";
import jwt from "jwt-decode";
import Contato from "./Contato.js";

export default class CadastrarUsuario extends Component {
  //navigator = Navigate();
  //navigator = Navigate();

  state = {
    step: 1,
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    senha: "",
    nome_cartao: "",
    numero_cartao: "",
    cvc_cartao: "",
    
    logradouro: "",
    numero: "",
    complemento: "",
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
    this.setState({ [input]: e.target.value });
  };

  handeSubmit = () => {
    const usuario = this.state;

    // manda atraves do service
    try {
      UsuarioService.criar(usuario);
      this.props.history.push("/login"); // redireciona para a pagina de login
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { step } = this.state;
    const values = this.state;

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
          <Contato
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
          />
        );
      case 3:
        return (
          <Endereco
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 4:
        return (
          <Pagamento
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 5:
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
