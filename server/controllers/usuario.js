const Usuario = require("../models/usuario");
const Endereco = require("../models/endereco");
const auth = require('../config/auth.js');

const Joi = require("joi");
const { enderecoController } = require("./endereco");

class UsuarioController {
  // cadastra um novo usuário
  async criar(req, res) {
    try {
      const { nome, email, senha, notificacoes, telefone, cpf, plano, cartao } = req.body;
      // endereco
      const { rua, numero, complemento, bairro, cidade, estado, cep } = req.body;

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
      
      // cria um novo endereco
      const endereco = new Endereco({
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        cep,        
      });

      const novo_endereco = await enderecoController.criar(endereco, res);
      console.log(novo_endereco);
      
      // procura o _id do novo endereco
      const _id = String((await Endereco.findOne(novo_endereco))._id);


      // cria um novo endereco
      const endereco = new Endereco({
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        cep,        
      });

      const novo_endereco = await enderecoController.criar(endereco, res);
      console.log(novo_endereco);
      
      // procura o _id do novo endereco
      const _id = String((await Endereco.findOne(novo_endereco))._id);

      const usuario = new Usuario({
        nome,
        email,
        senha,
        notificacoes,
        plano,
        telefone,
        cpf,
        cartao,
        endereco: _id,
      });

      // cria um novoc usuário com a nova foto
      await usuario.save();

      auth.incluirToken(usuario);

      return res.status(201).json({
        success: true,
        message: "Usuário cadastrado com sucesso!",
      });
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }


  // passa o cod_endereco para o usuário
  async adicionar_endereco(req, res) {
    try {
      const cod_usuario = req.params.codigo;

      const endereco = req.body;

      // verifica se o usuario existe

      const usuarioJaExiste = await Usuario.findOne(cod_usuario);

      if (!usuarioJaExiste) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      // verifica se o endereco já existe
      const enderecoJaExiste = await Endereco.findOne(endereco);

      if (!enderecoJaExiste) {
        return res.status(404).json({ error: "Endereço não encontrado" });
      }

      console.log(enderecoJaExiste);

      // adiciona o endereco ao usuario
      await Usuario.updateOne(
        { cod_usuario },
        {
          $push: {
            endereco: enderecoJaExiste,
          },
        }
      );

      console.log(usuarioJaExiste);

      return res.status(200).json({
        success: true,
        message: "Endereço adicionado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
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
      const { nome, email, notificacoes, plano, telefone, cpf, cartao } = req.body;
      const _id = String((await Usuario.findOne({ cod_usuario }))._id); // pega o id do usuário a partir do cod_usuario

      const usuario = await Usuario.findOne({ cod_usuario });

      if (!usuario) {
        return res.status(404).json({
          error: "Usuário não encontrado",
        });
      }

      // cria um cliente com os novos dados apenas para os atributos que foram passados
      const cliente = {};
      if (nome) cliente.nome = nome;
      if (email) cliente.email = email;
      if (notificacoes) cliente.notificacoes = notificacoes;
      if (plano) cliente.plano = plano;
      if (telefone) cliente.telefone = telefone;
      if (cpf) cliente.cpf = cpf;
      if (cartao) cliente.cartao = cartao;

      // atualiza o usuário

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

      // verifica se há usuários cadastrados e retorna o n'umero de usuários
      const usuarios = await Usuario.find({});
      if (usuarios.length === 0) {
        return res.status(404).json({
          error: "Não há usuários cadastrados",
        });
      }

      // exclui todos os usuários

      await Usuario.deleteMany({});
      return res.status(200).json({
        message: "Todos os usuários foram removidos com sucesso",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}

module.exports = new UsuarioController();
