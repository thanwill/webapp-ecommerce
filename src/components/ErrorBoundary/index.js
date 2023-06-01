import React, { Component } from 'react';

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
      return <div>Oops! Algo deu errado. Por favor, tente novamente mais tarde.</div>;
    }

    // Renderize os componentes filhos normalmente
    return this.props.children;
  }
}

export default ErrorBoundary;
