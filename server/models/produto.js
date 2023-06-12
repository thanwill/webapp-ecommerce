const mongoose = require("mongoose");
const produtoSchema = new mongoose.Schema({
  // código, nome, imagem, descrição, preço, categoria (relacionamento), lista de comentários do produto (não precisa de relacionamento).
  codigo: { type: Number, required: true, unique: true },
  nome: { type: String, required: true },
  imagem: Buffer,
  descricao: String,
  preco: { type: Number, required: true },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria" },
  comentarios: [
    {
      texto: String,
      autor: String,
      nota: { type: Number, required: true, min: 1, max: 5 },
    },
  ],
});
const Produto = mongoose.model("Produto", produtoSchema);
module.exports = Produto;
