// importa a bibliote Joi
const Joi = require("joi");
const Filme = require("../models/filme");
const Comentarios = require("../models/comentarios");
const Usuarios = require("../models/usuario");

class FilmeController {
  async criar(req, res) {
    try {
      const { titulo, ano, poster, nota, assistido, comentarios } = req.body;

      // Validação dos dados
      const schema = Joi.object({
        titulo: Joi.string().min(3).required(),
        ano: Joi.number().integer().min(1900).max(2099).required(),
        poster: Joi.string().uri().required(),
        nota: Joi.number().min(0).max(10).required(),
        assistido: Joi.boolean().required(),
        comentarios: Joi.array()
          .items(
            Joi.object({
              texto: Joi.string().min(3).required(),
              autor: Joi.string().required(),
            })
          )
          .required(),
      });

      const { error } = schema.validate({
        titulo,
        ano,
        poster,
        nota,
        assistido,
        comentarios,
      });

      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }

      // Verifica se o filme já existe
      const filmeJaExiste = await Filme.findOne({
        titulo,
      });

      if (filmeJaExiste) {
        return res.status(409).json({
          error: "Filme já cadastrado",
        });
      }

      const max = await Filme.findOne({}).sort({
        id: -1,
      });
      const id = max ? max.id + 1 : 1;

      const filme = new Filme({
        id,
        titulo,
        ano,
        poster,
        nota,
        assistido,
        comentarios,
      });

      const resultado = await filme.save();
      res.status(201).json(resultado);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  }

  async listar(req, res) {
    try {
      const filmes = await Filme.find();

      // se filmes for vazio, retorna uma mensagem avisando que não há filmes cadastrados
      if (!filmes.length) {
        return res.status(404).json({
          error: "Nenhum filme cadastrado",
        });
      }
      res.json(filmes);
    } catch (error) {
      res.status(500).json({
        error: "Erro ao listar filmes",
      });
    }
  }

  async buscarId(req, res) {
    const filme = await Filme.findOne({
      id: req.params.id,
    });

    if (!filme) {
      return res.status(404).json({
        error: "Filme não encontrado",
      });
    }
    try {
      res.json(filme);
    } catch (error) {
      res.status(500).json({
        error: "Erro ao buscar filme",
      });
    }
  }

  async adicionarComentario(req, res) {
    const { texto, nota } = req.body;

    const filme = await Filme.findOne({
      id: req.params.id,
    });

    if (!filme) {
      return res.status(404).json({
        status: false,
        error: "Filme não encontrado",
      });
    }

    if (!filme) {
      return res.status(404).json({
        status: false,
        error: "Filme não encontrado",
      });
    }


    const max = await Comentarios.findOne({}).sort({ id: -1 });
    const id = max ? max.id + 1 : 1;
    
    const novoComentario = {
      id,
      texto,
      nota,
    }


    if (!novoComentario) {
      return res.status(404).json({
        status: false,
        error: "O comentário precisa ser preenchido",
        data : novoComentario,
      });
    }

    filme.comentarios = novoComentario;
    const resultado = await filme.save();
      res.status(201).json(resultado);

    const _id = String((filme)._id);
    await Filme.findByIdAndUpdate(String(_id), req.body);

    try {
      return res.status(200).json({
        message: "Usuário atualizado com sucesso",
        data: filme,
      });
    } catch (error) {
      res.status(500).json({
        error: "Erro ao cadastrar comentário",
      });
    }
  }

  async deletar(req, res) {
    const id = req.params.id;

    const filme = Filme.findOne({
      id: id,
    });

    if (!filme) {
      return res.status(404).json({
        error: "Filme não encontrado",
      });
    }

    try {
      const _id = String(
        (
          await Filme.findOne({
            id: id,
          })
        )._id
      );
      await Filme.findByIdAndRemove(String(_id));
      res.json({
        message: "Filme removido com sucesso",
      });
    } catch (error) {
      res.status(500).json({
        error: `${error}`,
      });
    }
  }
}

module.exports = new FilmeController();
