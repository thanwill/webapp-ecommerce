const Endereco = require("../models/endereco");
const Usuario = require("../models/usuario");

class EnderecoController {
  // cria um novo endereco
  async criar(endereco, res) {
    try {
      await Endereco.create(endereco);

      if (!endereco) {
        return res.status(400).json({ error: "Endereço não cadastrado" });
      }

      return endereco;
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  // exibe todos os endereços cadastrados
  async listar(req, res) {
    try {
      const enderecos = await Endereco.find({});
      if (!enderecos.length) {
        return res.status(404).json({ error: "Não há endereços cadastrados" });
      }
      return res.status(200).json(enderecos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // exibe um endereco por ID
  async exibir_endereco(req, res) {
    try {
      const { cod_endereco } = req.params;
      const endereco = await Endereco.findOne({ cod_endereco });

      if (!endereco) {
        return res.status(404).json({ error: "Endereço não encontrado" });
      }

      return res.status(200).json(endereco);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // retorna o endereco pelo id do usuario
  async exibir_usuario(req, res) {
    try {
      const { cod_usuario } = req.params;
      const usuario = await Usuario.findOne({ cod_usuario });

      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const endereco = await Endereco.findOne({ _id: usuario.endereco });

      if (!endereco) {
        return res.status(404).json({ error: "Endereço não encontrado" });
      }

      return res.status(200).json(endereco);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // limpa a colletion de enderecos
  async excluirTudo(res) {
    try {
      const enderecos = await Endereco.find({});
      if (enderecos.length === 0) {
        return res.status(404).json({
          error: "Não há endereços cadastrados",
        });
      }
      console.log(enderecos);
      await Endereco.deleteMany({});
      return res.status(200).json({
        message: "Todos os endereços foram removidos com sucesso",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}

const enderecoController = new EnderecoController();
module.exports = { enderecoController };
