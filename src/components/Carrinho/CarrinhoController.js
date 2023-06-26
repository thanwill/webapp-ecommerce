import React, { Component } from "react";
import Resumo from "./Resumo.js";
import ProdutosSelecionados from "./ProdutosSelecionados.js";

export default class CarrinhoController extends Component {
  state = {
    step: 1,
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
      console.log(usuario);
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
          <ProdutosSelecionados
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
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
