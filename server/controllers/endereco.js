const Endereco = require("../models/endereco");
const Usuario = require("../models/usuario");

class EnderecoController {
  // cria um novo endereco
  async criar(endereco, res) {
    try {
      await Endereco.create(endereco);

      if (!endereco) {
        return res.status(400).json({
          status: false,
          message: "Não foi possível cadastrar o endereço",
        });
      }

      return endereco;
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: false, message: error.message });
    }
  }

  // exibe todos os endereços cadastrados
  async listar(req, res) {
    try {
      const enderecos = await Endereco.find({});
      if (!enderecos.length) {
        return res.status(404).json({ status: false, message: "Não há endereços cadastrados" });
      }
      return res.status(200).json({ status: true, enderecos });
    } catch (error) {
      return res.status(500).json({ sttus: false, message: error.message });
    }
  }

  // atualiza um endereco por ID
  async atualizar(req, res) {
    try {
      const { cod_endereco } = req.params;
      const enderecoAtualizado = req.body;
      const endereco = await Endereco.findOne({ cod_endereco });

      if (!endereco) {
        return res.status(404).json({ status: false, message: "Endereço não encontrado" });
      }

      /*
        "rua": "Rua Antônio Escorsin",
        "numero": 123,
        "bairro": "Santa Cândida",
        "cidade": "Curitiba",
        "estado": "PR",
        "cep": "82940250",
        "complemento": "Sala 501",
      */

      // cria um objeto com os dados atualizados do endereco, verificando se o campo foi preenchido
      const dadosEndereco = {
        rua: enderecoAtualizado.rua ? enderecoAtualizado.rua : endereco.rua,
        numero: enderecoAtualizado.numero ? enderecoAtualizado.numero : endereco.numero,
        bairro: enderecoAtualizado.bairro ? enderecoAtualizado.bairro : endereco.bairro,
        cidade: enderecoAtualizado.cidade ? enderecoAtualizado.cidade : endereco.cidade,
        estado: enderecoAtualizado.estado ? enderecoAtualizado.estado : endereco.estado,
        cep: enderecoAtualizado.cep ? enderecoAtualizado.cep : endereco.cep,
        complemento: enderecoAtualizado.complemento ? enderecoAtualizado.complemento : endereco.complemento,
      };

      await Endereco.findOneAndUpdate({ cod_endereco }, dadosEndereco, { new: true }); //

      if (!endereco) {
        return res.status(404).json({ status: false, message: "Endereço não encontrado" });
      }

      return res.status(200).json({ status: true, message:"Os dados de endereço foram atualizados com sucesso.",endereco });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  }

  // exibe um endereco por ID
  async exibir_endereco(req, res) {
    try {
      const { cod_endereco } = req.params;
      const endereco = await Endereco.findOne({ cod_endereco });

      if (!endereco) {
        return res.status(404).json({ status: false, error: "Endereço não encontrado" });
      }

      return res.status(200).json({ status: true, endereco });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  }

  // retorna o endereco pelo id do usuario
  async exibir_usuario(req, res) {
    try {
      const { cod_usuario } = req.params;
      const usuario = await Usuario.findOne({ cod_usuario });

      if (!usuario) {
        return res.status(404).json({ status: false, message: "Usuário não encontrado" });
      }

      const endereco = await Endereco.findOne({ _id: usuario.endereco });

      if (!endereco) {
        return res.status(404).json({ status: false, message: "Endereço não encontrado" });
      }

      return res.status(200).json({ status: true, endereco });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  }

  // limpa a colletion de enderecos
  async excluirTudo(res) {
    try {
      const enderecos = await Endereco.find({});
      if (enderecos.length === 0) {
        return res.status(404).json({
          status: false,
          message: "Não há endereços cadastrados",
        });
      }
      console.log(enderecos);
      await Endereco.deleteMany({});
      return res.status(200).json({
        status: true,
        message: "Todos os endereços foram removidos com sucesso",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }
}

const enderecoController = new EnderecoController();
module.exports = { enderecoController };
