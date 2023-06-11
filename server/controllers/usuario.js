const fs = require("fs");
const path = require("path");
const Usuario = require("../models/usuario");
const Joi = require("joi");

class UsuarioController {
  async criar(req, res) {
    try {
      const { nome, email, senha, newsletter, plano } = req.body;

      // Verifica se o usuário já existe
      const usuarioJaExiste = await Usuario.findOne({ email });

      if (usuarioJaExiste) {
        return res.status(409).json({
          error: "Usuário já cadastrado",
        });
      }

      const max = await Usuario.findOne({}).sort({ id: -1 });
      const id = max ? max.id + 1 : 1;

      if (!req.file) {
        return res.status(400).json({
          error: "É necessário enviar uma imagem",
        });
      }

      // Lê o arquivo temporário da foto
      const fotoBuffer = fs.readFileSync(req.file.path);
      // Remove o arquivo temporário da foto
      fs.unlinkSync(req.file.path);

      // crie o objeto do usuário com os dados e a foto
      const usuario = new Usuario({
        id,
        nome,
        email,
        senha,
        newsletter,
        plano,
        foto: {
          data: fotoBuffer,
          contentType: req.file.mimetype,
        },
      });

      usuario.save();

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

  async listar(req, res) {
    try {
      const usuarios = await Usuario.find({});
      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async exibir(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findOne({
        id,
      });

      if (!usuario) {
        return res.status(404).json({
          error: "Usuário não encontrado",
        });
      }

      if (!usuario.foto || !usuario.foto.data) {
        return res.status(404).json({
          error: "Imagem do usuário não encontrada",
        });
      }

      // Define o cabeçalho Content-Type para o tipo de conteúdo da imagem
      res.set("Content-Type", usuario.foto.contentType);

      // Retorna a URL de acesso direto ao buffer da imagem
      return res.status(200).json({
        fotoUrl: `/imagem/${id}`,
        usuario: usuario,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, senha, foto, newsletter, plano } = req.body;

      // Validação dos dados
      const schema = Joi.object({
        nome: Joi.string().min(3),
        email: Joi.string().email(),
        senha: Joi.string().min(6),
        foto: Joi.string().uri(),
        newsletter: Joi.boolean(),
        plano: Joi.number().integer().min(0).max(3),
      });

      const { error } = schema.validate(req.body);

      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }

      const usuario = await Usuario.findOne({
        id,
      });

      if (!usuario) {
        return res.status(404).json({
          error: "Usuário não encontrado",
        });
      }

      const _id = String((await Usuario.findOne({ id: id }))._id);
      await Usuario.findByIdAndUpdate(String(_id), req.body);

      return res.status(200).json({
        message: "Usuário atualizado com sucesso",
        data: usuario,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async excluir(req, res) {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findOne({
        id,
      });

      if (!usuario) {
        return res.status(404).json({
          error: "Usuário não encontrado",
        });
      }

      await Usuario.deleteOne({ id });

      return res.status(200).json({
        message: "Usuário removido com sucesso",
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async carregarFoto(req, res) {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findOne({
        id,
      });

      if (!usuario) {
        return res.status(404).json({
          error: "Usuário não encontrado",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          error: "É necessário enviar uma imagem",
        });
      }

      usuario.foto = req.file.filename;

      const _id = String((await Usuario.findOne({ id: id }))._id);
      await Usuario.findByIdAndUpdate(String(_id), req.body);

      return res.status(200).json({
        message: "Foto carregada com sucesso",
        data: usuario,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}

module.exports = new UsuarioController();
