import React, { Component } from 'react';
import Title from '../Title';
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o estado para indicar que ocorreu um erro
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Aqui você pode registrar o erro ou fazer outras ações de tratamento de erros
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Personalize a mensagem de erro para os usuários
      return (
        <div className="row">
          <div className="col-10 offset-1 text-center mt-5 ">
            <img className='mb-5 mt-5' src="./assets/quebrado.png" alt="" />
            <Title
              title="Algo aqui está quebrado ..."
              subtitle="Considere avaliar os logs do erro no console."
            />
          </div>
        </div>
      );
    }

    // Renderize os componentes filhos normalmente
    return this.props.children;
  }
}

export default ErrorBoundary;
