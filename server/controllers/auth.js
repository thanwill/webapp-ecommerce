/*
1 cabecalho
2 payload
3 verificacao de assinatura
*/

const Usuario = require('../models/usuario');
const auth = require('../config/auth');
const bcryptjs = require('bcryptjs');

class LoginController {

    async login(req, res) {
        const { email, senha } = req.body;
        const cliente = await Usuario.findOne({ 'email': email }).select('+senha')
        
        if (!cliente) {
            return res.status(400).send({ error: 'Usuário não encontrado!' });
        }

        if (!await bcryptjs.compare(senha, cliente.senha)) {
            return res.status(400).send({ error: 'Senha inválida!' });
        }

        await auth.incluirToken(cliente);
        res.status(200).json(cliente);
    }
}

module.exports = new LoginController();
