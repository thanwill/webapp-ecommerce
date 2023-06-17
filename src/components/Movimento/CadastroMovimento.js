import React, { Component } from "react";
import CategoriaStep from "./CategoriaStep";
import ProdutoStep from "./ProdutoStep";
import ItemStep from "./ItemStep";
import MovimentoStep from "./MovimentoStep";

export default class CadastroMovimento extends Component {
  state = {
    step: 1,
    motivo: "",
    documento: "",
    deposito_origem: "",
    local_destino: "",
    itens: [],
  };
  nextStep() {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  }
  prevStep() {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  }

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const { motivo, documento, deposito_origem, local_destino, itens } = this.state;
    const values = { motivo, documento, deposito_origem, local_destino, itens };

    switch (step) {
      case 1:
        return (
          <CategoriaStep
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <ProdutoStep
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <ItemStep
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 4:
        return (
          <MovimentoStep
            nextStep={this.nextStep}
            prevStep={this.prevStep}
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
