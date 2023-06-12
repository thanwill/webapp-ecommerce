const Usuario = require("../models/usuario");
const Joi = require("joi");

class UsuarioController {
  async criar(req, res) {
    try {
      const { nome, email, senha, newsletter, plano } = req.body;
      const { mimetype, buffer } = req.file;

      // Verifica se o usuário já existe
      const usuarioJaExiste = await Usuario.findOne({ email });

      if (usuarioJaExiste) {
        return res.status(409).json({
          error: "Usuário já cadastrado",
        });
      }

      const max = await Usuario.findOne({}).sort({ id: -1 });
      const id = max ? max.id + 1 : 1;

      // valida os dados

      const schema = Joi.object({
        nome: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        senha: Joi.string().min(6).required(),
        newsletter: Joi.boolean().required(),
        plano: Joi.number().integer().min(0).max(3).required(),
      });

      const { error } = schema.validate({
        nome,
        email,
        senha,
        newsletter,
        plano,
      });

      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }

      // verifica mimetype
      if (!["image/png", "image/jpeg"].includes(mimetype)) {
        return res.status(400).json({
          error: "Formato de imagem inválido",
        });
      }

      // dataCriacao
      const dataCriacao = new Date();
      // dataAtualizacao
      const dataAtualizacao = new Date();
      
      const usuario = new Usuario({
        id,
        nome,
        email,
        senha,
        newsletter,
        plano,
        foto: {
          data: buffer,
          contentType: mimetype,
        },
        dataCriacao,
        dataAtualizacao,
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

  async listarUsuarios(req, res) {
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

  async listarPorId(req, res) {
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

  async carregarFoto(req, res) {
    const { mimetype, buffer } = req.file;
    const { id } = req.params;

    const usuario = await Usuario.findOne({
      id,
    });

    if (!usuario) {
      return res.status(404).json({
        error: "Usuário não encontrado",
      });
    }

    // cria uma instancia para atualizar o usuário localizado
    const newPhoto = {
      data: buffer,
      contentType: mimetype,
    };

    // atualiza o usuário com a nova foto
    usuario.foto = await Usuario.findOneAndUpdate({ id }, { $push: { fotos: newPhoto } }, { new: true });

    return res.status(200).json({
      message: "Foto adicionada com sucesso",
      data: usuario,
    });
  }

  // devolve a foto do usuário para ser exibida no front-end
  async exibirFoto(req, res) {
    const { id } = req.params;

    const usuario = await Usuario.findOne({
      id,
    });

    if (!usuario) {
      return res.status(404).json({
        error: "Usuário não encontrado",
      });
    }

    const foto = usuario.foto;

    return res.status(200).send(foto.data);
  }
}

module.exports = new UsuarioController();
