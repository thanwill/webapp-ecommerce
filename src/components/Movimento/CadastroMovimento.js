import React, { Component } from "react";
import ItemStep from "./ItemStep";
import MovimentoStep from "./MovimentoStep";
import Resumo from "./Resumo";
import { AuthService } from "../../services/login";
import jwt from "jwt-decode";

export default class CadastroMovimento extends Component {
  state = {
    step: 1,
    motivo: "",
    documento: "",
    deposito_origem: "",
    local_destino: "",
    itens: [],
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
    const { motivo, documento, deposito_origem, local_destino, itens } =
      this.state;

    const movimento = {
      motivo,
      documento,
      deposito_origem,
      local_destino,
      itens,
    };

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
    const { motivo, documento, deposito_origem, local_destino, itens } =
      this.state;
    const values = { motivo, documento, deposito_origem, local_destino, itens };

    switch (step) {
      case 1:
        return (
          <MovimentoStep
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <ItemStep
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChangeItem={this.handleChangeItem}
            values={values}
          />
        );
      case 3:
        return (
          <Resumo
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            // handeSubmit
            handeSubmit={this.handeSubmit}
            values={values}
          />
        );
      // nunca esqueça o padrão caso contrário, o código VS seria louco!
      default:
        return <p>Erro</p>;
    }
  }
}
