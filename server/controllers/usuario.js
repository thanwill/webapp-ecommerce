const Usuario = require("../models/usuario");
const Joi = require("joi");

class UsuarioController {
  async criar2(req, res) {
    try {
      const { nome, email, senha, foto, newsletter, plano } = req.body;

      // Verifica se o usuário já existe
      const usuarioJaExiste = await Usuario.findOne({ email });

      if (usuarioJaExiste) {
        return res.status(409).json({
          error: "Usuário já cadastrado",
        });
      }

      const max = await Usuario.findOne({}).sort({ id: -1 });
      const id = max ? max.id + 1 : 1;

      const fotoBuffer = Buffer.from(foto, "base64");

      const usuario = new Usuario({
        id,
        nome,
        email,
        senha,
        newsletter,
        plano,
        foto: fotoBuffer,
      });

      const resultado = await usuario.save();

      return res.status(201).json({
        success: true,
        message: "Usuário cadastrado com sucesso!",
        data: resultado,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
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

      const foto = req.file;
      console.log(foto);

      // crie o objeto do usuário com os dados e a foto
      const usuario = new Usuario({
        id,
        nome,
        email,
        senha,
        newsletter,
        plano,
        foto: foto.buffer,
      });

      const resultado = usuario.save();

      return res.status(201).json({
        success: true,
        message: "Usuário cadastrado com sucesso!",
        data: resultado,
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
      return res.status(200).json(usuario);
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

      if (nome) {
        usuario.nome = nome;
      }

      if (email) {
        usuario.email = email;
      }

      if (senha) {
        usuario.senha = senha;
      }

      if (foto) {
        usuario.foto = foto;
      }

      if (newsletter) {
        usuario.newsletter = newsletter;
      }

      if (plano) {
        usuario.plano = plano;
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

  async atualizarOld(req, res) {
    const codigo = req.params.codigo;
    const _id = String((await Usuario.findOne({ codigo: codigo }))._id);
    await Usuario.findByIdAndUpdate(String(_id), req.body);
    res.status(200).json({ message: "Atualizado com sucesso!" });
  }

  async deletar(req, res) {
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

      await usuario.remove();

      return res.status(200).json({
        message: "Usuário removido com sucesso",
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}

module.exports = new UsuarioController();
