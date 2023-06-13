const Usuario = require("../models/usuario");
const Joi = require("joi");

class UsuarioController {
  // cadastra um novo usuário
  async criar(req, res) {
    try {
      const { nome, email, senha, notificacoes, telefone, cpf, plano, cartao } = req.body;

      // Verifica se o usuário já existe
      const usuarioJaExiste = await Usuario.findOne({ email });

      if (usuarioJaExiste) {
        return res.status(409).json({
          error: "Usuário já cadastrado",
        });
      }

      const schema = Joi.object({
        nome: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        senha: Joi.string().min(6).required(),
        notificacoes: Joi.boolean().required(),
        plano: Joi.number().integer().min(0).max(3).required(),
        telefone: Joi.string().min(11).max(11).required(),
        cpf: Joi.string().min(11).max(11).required(),
        cartao: Joi.object().keys({
          nome: Joi.string().min(3).required(),
          numero: Joi.string().min(16).max(16).required(),
          cvc: Joi.string().min(3).max(3).required(),
        }),
      });

      const { error } = schema.validate({
        nome,
        email,
        senha,
        notificacoes,
        plano,
        telefone,
        cpf,
        cartao,
      });

      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }

      const usuario = new Usuario({
        nome,
        email,
        senha,
        notificacoes,
        plano,
        telefone,
        cpf,
        cartao,
      });

      // cria um novoc usuário com a nova foto
      await usuario.save();

      return res.status(201).json({
        success: true,
        message: "Usuário cadastrado com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async listar_usuarios(req, res) {
    try {
      const usuarios = await Usuario.find({});
      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async exibir_id(req, res) {
    try {
      const { cod_usuario } = req.params;

      const usuario = await Usuario.findOne({ cod_usuario });

      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async atualizar_id(req, res) {
    try {
      const { cod_usuario } = req.params;
      const cliente = req.body;
      const _id = String((await Usuario.findOne({ cod_usuario }))._id);

      const usuario = await Usuario.findOne({ cod_usuario });

      if (!usuario) {
        return res.status(404).json({
          error: "Usuário não encontrado",
        });
      }

      await Usuario.findByIdAndUpdate(_id, cliente);

      return res.status(200).json({
        message: "Usuário atualizado com sucesso",
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async excluir_id(req, res) {
    try {
      const { cod_usuario } = req.params;

      const _id = String((await Usuario.findOne({ cod_usuario }))._id);
      const usuario = await Usuario.findOne({ cod_usuario });

      if (!usuario) {
        return res.status(404).json({
          error: "Usuário não encontrado",
        });
      }

      await Usuario.findByIdAndRemove(String(_id));

      return res.status(200).json({
        message: "Usuário removido com sucesso",
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  // exclui toda a base
  async excluirTudo(res) {
    try {
      await Usuario.deleteMany({});
      return res.status(200).json({
        message: "Todos os usuários foram removidos com sucesso",
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}

module.exports = new UsuarioController();
