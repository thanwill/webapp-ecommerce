// classe de venda do sistema
const { MovimentoTransacao, Detalhes, Venda } = require("../models/transacoes");
const { Produto, Deposito, Movimento, ItemMovimento } = require("../models/estoque");

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
    var data = [];
    try {
      // { produto, quantidade, valor_unitario } = detalhes

      const detalhes = req.body;

      detalhes.forEach((detalhe) => {
        const { produto } = detalhe;
        const produtoConsulta = Produto.findOne({ cod_produto: produto });
        
        if (!produtoConsulta) {
          return res.status(404).json({
            success: false,
            message: "Produto não encontrado!",
          });
        }

        const itemConsulta = ItemMovimento.findOne({ produto: produtoConsulta._id });

        if (!itemConsulta) {
          return res.status(404).json({
            success: false,
            message: "Item não encontrado no estoque!",
          });
        }

        if (itemConsulta.quantidade < detalhe.quantidade) {
          return res.status(404).json({
            success: false,
            message: "Quantidade insuficiente no estoque!",
          });
        }

        detalhe = new Detalhes({
          produto: produtoConsulta._id,
          quantidade: detalhe.quantidade,
          valor_unitario: detalhe.valor_unitario,
        });

        // salva o item no banco de dados
        detalhe.save();
        data.push(detalhe);
      });

      // veriiica se o array está vazio
      if (data.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Nenhum item encontrado!",
        });
      }

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

  async criaTransacao(req, res) {
    try {
      const { cliente, detalhes, venda, tipo } = req.body;

      const movimento = new MovimentoTransacao({
        cliente,
        detalhes,
        venda,
        tipo,
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
