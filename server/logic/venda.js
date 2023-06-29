// classe de venda do sistema
const { MovimentoTransacao, Detalhes, Venda } = require("../models/transacoes");
const { Produto, Deposito, Movimento, ItemMovimento } = require("../models/estoque");
const Usuario = require("../models/usuario");
class VendaController {
  // cria um movimento de transação

  async gerarVenda(req, res) {
    try {
      const { valor_original, status, data_pagamento, valor_pago, valor_juros } = req.body;

      const venda = new Venda({
        valor_original,
        status,
        data_pagamento,
        valor_pago,
        valor_juros,
      });

      const data = await venda.save();

      return res.status(201).json({
        success: true,
        message: "Movimento de transação criado com sucesso!",
        data: data.cod_venda,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Erro ao criar movimento de transação!",
      });
    }
  }

  async gerarDetalhes(req, res) {
    try {
      const { produto, quantidade, valor_unitario } = req.body;

      const produtoConsulta = await Produto.findOne({ cod_produto: produto });

      if (!produtoConsulta) {
        return res.status(404).json({
          success: false,
          message: "Produto não encontrado!",
        });
      }

      const itemConsulta = await ItemMovimento.findOne({ produto: produtoConsulta._id });

      if (!itemConsulta) {
        return res.status(404).json({
          success: false,
          message: "Item não encontrado no estoque!",
        });
      }

      if (itemConsulta.quantidade < quantidade) {
        return res.status(404).json({
          success: false,
          message: "Quantidade insuficiente no estoque!",
        });

      }

      const detalhe = new Detalhes({
        produto: produtoConsulta._id,
        quantidade,
        valor_unitario,
      });

      // salva o item no banco de dados

      const data = await detalhe.save();

      return res.status(201).json({
        success: true,
        message: "Detalhes da venda criados com sucesso!",
        data: data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Erro ao criar detalhes da venda!",
      });
    }
  }

  // lista as vendas
  async listaVendas(req, res) {
    try {
      const vendas = await Venda.find();
      // verifica se existem vendas
      if (vendas.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Nenhuma venda encontrada!",
        });
      }

      return res.status(200).json({
        success: true,
        count: vendas.length,
        data: vendas,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Erro ao listar vendas!",
      });
    }
  }

  // Lista os detalhes
  async listaDetalhes(req, res) {
    try {
      const detalhes = await Detalhes.find();
      // verifica se existem vendas
      if (detalhes.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Nenhuma venda encontrada!",
        });
      }

      return res.status(200).json({
        success: true,
        count: detalhes.length,
        data: detalhes,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Erro ao listar vendas!",
      });
    }
  }

  // Cria transação
  async criaTransacao(req, res) {
    try {
      const { cliente, detalhes, venda, tipo } = req.params;
      
      const clienteId = await Usuario.findOne({ cod_usuario: cliente });

      if (!clienteId) {
        return res.status(404).json({
          success: false,
          message: "Cliente não encontrado!",
        });
      }
      
      const movimento = new MovimentoTransacao({
        cliente: clienteId._id, // Atribui o ID do cliente encontrado
        detalhes, 
        venda, 
        tipo
      });
  
      const data = await movimento.save();
  
      return res.status(201).json({
        success: true,
        message: "Movimento de transação criado com sucesso!",
        data: data.cod_movimento,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Erro ao criar movimento de transação!",
      });
    }
  }
  

  // lista os movimentos de transação
  async listaTransacoes(req, res) {
    try {
      const movimentos = await MovimentoTransacao.find();
      // verifica se existem movimentos
      if (movimentos.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Nenhum movimento de transação encontrado!",
        });
      }

      return res.status(200).json({
        success: true,
        count: movimentos.length,
        data: movimentos,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Erro ao listar movimentos de transação!",
      });
    }
  }

}

module.exports = new VendaController();
