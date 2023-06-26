const mongoose = require("mongoose");
const Endereco = require("./endereco");
const valida = require("./valida");
const categoriaSchema = new mongoose.Schema({
  //código, nome e descrição
  cod_categoria: {
    type: String,
    required: true,
    unique: true,
    default: function () {
      return valida.gerarCodigo("CAT");
    },
  },
  nome: { type: String, required: true },
  descricao: { type: String, required: false },
});

const produtosSchema = new mongoose.Schema({
  //código, nome, descrição, preço, categoria, fornecedor
  cod_produto: {
    type: String,
    required: true,
    unique: true,
    default: function () {
      return valida.gerarCodigo("PROD");
    },
  },
  nome: { type: String, required: true },
  descricao: String,
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria" },
});

const depositoSchema = new mongoose.Schema({
  // código, nome, endereco (referencia)
  cod_deposito: {
    type: String,
    required: true,
    unique: true,
    default: function () {
      return valida.gerarCodigo("DEP");
    },
  },
  nome: { type: String, required: true },
  endereco: { type: mongoose.Schema.Types.ObjectId, ref: "Endereco" },
});

const movimentacaoSchema = new mongoose.Schema({
  // cod_movimento, itens, motivo, documento, data_criacao, deposito_origem, local_destino, array de itens.
  cod_movimento: {
    type: String,
    required: true,
    unique: true,
    default: function () {
      return valida.gerarCodigo("MOV");
    },
  },
  valor_total: { type: Number, required: true },
  motivo: { type: String, required: true },
  documento: { type: String, required: true },
  data_criacao: { type: Date, required: true, default: Date.now },
  deposito_origem: { type: mongoose.Schema.Types.ObjectId, ref: "Deposito" },
  local_destino: { type: mongoose.Schema.Types.ObjectId, ref: "Deposito" },
  // recebe um array de itens
  itens: [{ type: mongoose.Schema.Types.ObjectId, ref: "ItemMovimento" }],
});

const itemMovimentoSchema = new mongoose.Schema({
  // cod_item, valor_unitario, cod_movimento, cod_produto, quantidade
  cod_item: {
    type: String,
    required: true,
    default: function () {
      return valida.gerarCodigo("ITM");
    },
  },
  // valor_unitario float
  valor_unitario: { type: Number, required: true },
  quantidade: { type: Number, required: true },
  produto: { type: mongoose.Schema.Types.ObjectId, ref: "Produto", required: true },
});

// se o deposito for excluido, o endereco tbm é
depositoSchema.pre("remove", async function (next) {
  try {
    this.populate("cod_produto");
    await Endereco.deleteOne({ _id: this.endereco });
    // verifica se há referencia em item movimento
    const item = await ItemMovimento.findOne({ deposito: this._id });
    if (item) {
      return next(new Error("Depósito não pode ser excluído pois está sendo usado em um item de movimentação"));
    }

    // verfica se produto está usando o deposito
    const produto = await Produto.findOne({ deposito: this._id });
    if (produto) {
      return next(new Error("Depósito não pode ser excluído pois está sendo usado em um produto"));
    }
    next();
  } catch (error) {
    next(error);
  }
});


// se o produto for excluido, o deposito tbm é

produtosSchema.pre("remove", async function (next) {
  try {
    // verifica se há referencia em item movimento
    const item = await ItemMovimento.findOne({ produto: this._id });
    if (item) {
      return next(new Error("Produto não pode ser excluído pois está sendo usado em um item de movimentação"));
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Movimento = mongoose.model("Movimento", movimentacaoSchema);
const Categoria = mongoose.model("Categoria", categoriaSchema);
const Produto = mongoose.model("Produto", produtosSchema);
const Deposito = mongoose.model("Deposito", depositoSchema);
const ItemMovimento = mongoose.model("ItemMovimento", itemMovimentoSchema);

module.exports = { Categoria, Produto, Deposito, Movimento, ItemMovimento };
