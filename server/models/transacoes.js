const mongoose = require("mongoose");
const valida = require("./valida");
const movimentoTransacaoSchema = new mongoose.Schema({
  //código, data, cliente, itens, valor total e forma de pagamento
  cod_transacao: {
    type: String,
    required: true,
    unique: true,
    default: function () {
      return valida.gerarCodigo("TRA");
    },
  },
  data: { type: Date, required: true, default: Date.now },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },
  detalhes: [{ type: mongoose.Schema.Types.ObjectId, ref: "ItemVenda", required: true }],
  venda: { type: mongoose.Schema.Types.ObjectId, ref: "Venda", required: true },
  // abertura, criação, fechamento, cancelamento e devolução, liquidado
  tipo: { type: String, required: true, default: "entrada" }, // entrada, saida
  valor_total: { type: Number, required: true },
  descricao : { type: String, default: "Gerado pelo e-commerce" },
});

const DetalheSchema = new mongoose.Schema({
  //código, produto, quantidade, valor unitário, valor total
  cod_detalhes: {
    type: String,
    required: true,
    unique: true,
    default: function () {
      return valida.gerarCodigo("DET");
    },
  },
  produto: { type: mongoose.Schema.Types.ObjectId, ref: "Produto", required: true },
  quantidade: { type: Number, required: true },
  valor_unitario: { type: Number, required: true },
});

const VendaSchema = new mongoose.Schema({
  // titulos: data_vencimento, valor_original, status (aberto, pago, cancelado), data_pagamento, valor_pago, valor_juros, valor_multa, valor_desconto
  cod_venda: {
    type: String,
    required: true,
    unique: true,
    default: function () {
      return valida.gerarCodigo("VEN");
    },
  },
  data: { type: Date, required: true, default: Date.now },
  // vencimento padrão 30 dias
  data_vencimento: { type: Date, required: true, default: Date.now + 30 },
  valor_original: { type: Number, required: true },
  status: { type: String, required: true, default: "aberto" },
  data_pagamento: { type: Date },
  valor_pago: { type: Number },
  valor_juros: { type: Number },
});

const MovimentoTransacao = mongoose.model("MovimentoTransacao", movimentoTransacaoSchema);
const Detalhes = mongoose.model("Detalhes", DetalheSchema);
const Venda = mongoose.model("Venda", VendaSchema);

module.exports = { MovimentoTransacao, Detalhes, Venda };
