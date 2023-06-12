// OAuth 2.0 do Google

// 1. Criar um projeto no Google Cloud Platform
// 2. Ativar a API do Google+ no projeto
// 3. Criar um OAuth Client ID no projeto
// 4. Configurar o OAuth Client ID no projeto
// 5. Configurar o OAuth Client ID no frontend
// 6. Configurar o OAuth Client ID no backend
// 7. Testar o login com o Google

import React from 'react';

export default function Login(){
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3 mt-5">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-center">Login</h3>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlhtmlFor="email">E-mail</label>
                                        <input type="email" className="form-control" id="email" placeholder="Digite seu e-mail" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlhtmlFor="senha">Senha</label>
                                        <input type="password" className="form-control" id="senha" placeholder="Digite sua senha" />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block">Entrar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
}