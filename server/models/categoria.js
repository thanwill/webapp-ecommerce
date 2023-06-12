const mongoose = require("mongoose");
const categoriaSchema = new mongoose.Schema({
    //código, nome e descrição
    codigo: { type: Number, required: true, unique: true },
    nome: { type: String, required: true },
    descricao: String,
});
const Categoria = mongoose.model("Categoria", categoriaSchema);
module.exports = Categoria;
