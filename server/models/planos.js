const mongoose = require("mongoose");
const planoSchema = new mongoose.Schema({
  // codigo, nome, valor, descricao
  codigo: { type: Number, required: true, unique: true },
  nome: { type: String, required: true },
  valor: { type: Number, required: true },
  descricao: String,
});
const Plano = mongoose.model("Plano", planoSchema);
module.exports = Plano;
