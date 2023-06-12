// endereco
const mongoose = require("mongoose");
const enderecoSchema = new mongoose.Schema({
    // rua, numero, complemento, bairro, cidade, estado, cep
    rua: { type: String, required: true },
    numero: { type: Number, required: true },
    complemento: String,
    bairro: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
    cep: { type: Number, required: true },
});
const Endereco = mongoose.model("Endereco", enderecoSchema);
module.exports = Endereco;

