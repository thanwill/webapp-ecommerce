const Joi = require('joi');
const Usuario = require('../models/usuario');

class UsuarioController {

    async criar(req, res) {
        try {
            const {
                nome,
                email,
                senha,
                foto,
                newsletter,
                plano
            } = req.body;

            // Validação dos dados
            const schema = Joi.object({
                nome: Joi.string().min(3).required(),
                email: Joi.string().email().required(),
                senha: Joi.string().min(6).required(),
                foto: Joi.string().uri().required(),
                newsletter: Joi.boolean().required(),
                plano: Joi.number().integer().min(0).max(3).required()
            });

            const {
                error
            } = schema.validate({
                nome,
                email,
                senha,
                foto,
                newsletter,
                plano
            });

            if (error) {
                return res.status(400).json({
                    error: error.details[0].message
                });
            }

            // Verifica se o usuário já existe
            const usuarioJaExiste = await Usuario.findOne({
                email
            });

            if (usuarioJaExiste) {
                return res.status(409).json({
                    error: 'Usuário já cadastrado'
                });
            }

            const max = await Usuario.findOne({}).sort({
                id: -1
            });
            const id = max ? max.id + 1 : 1;

            const usuario = await Usuario.create({
                id,
                nome,
                email,
                senha,
                foto,
                newsletter,
                plano
            });

            return res.status(201).json(usuario);
        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }

}

module.exports = new UsuarioController();